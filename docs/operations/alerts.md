# Security alerting

The API emits security metrics over OpenTelemetry (OTLP, enabled with `Otel:Endpoint`) and can additionally notify
Admins in-app when obvious attack patterns appear. Metric alerts are the primary path; the built-in notifier is a
safety net for small deployments without an alerting stack.

## Metrics

Meter `Mastemy.Security`, counter `mastemy.security.events` (unit `{event}`). Every security log point
(`Mastemy.Security` logger category, `SecurityEvents.Warn`) increments it once. Labels:

| Label | Values |
|---|---|
| `category` | `login_failure`, `mfa_failure`, `token_reuse`, `rate_limited`, `forbidden`, `unauthorized`, `other` |
| `event` | the raw event code, e.g. `login_failed_bad_password`, `login_failed_unknown_user`, `login_rejected_backoff`, `invalid_mfa_code`, `invalid_mfa_challenge`, `refresh_token_reuse`, `rate_limited`, `forbidden` |

403 responses produced by authorization policies (which never reach a log point) are counted with
`category="forbidden", event="forbidden"`; a 403 that was already logged is not counted twice.

With the OpenTelemetry Collector's Prometheus exporter the series is exposed as
`mastemy_security_events_total{category="…",event="…"}` (names below assume that translation; adjust the prefix if your
collector adds a namespace). The client IP is deliberately **not** a metric label (unbounded cardinality, personal data);
per-IP detection uses the logs or the built-in notifier.

## Alert rules (Prometheus)

```yaml
groups:
  - name: mastemy-security
    rules:
      # Credential stuffing / brute force across the whole site.
      - alert: MastemyLoginFailureSpike
        expr: sum(increase(mastemy_security_events_total{category="login_failure"}[5m])) > 100
        for: 2m
        labels: { severity: warning }
        annotations:
          summary: "More than 100 failed sign-ins in 5 minutes"
          runbook: "docs/operations/runbook.md - check Mastemy.Security logs for the source IPs; block at the edge if one network dominates."
      - alert: MastemyLoginFailureFlood
        expr: sum(increase(mastemy_security_events_total{category="login_failure"}[5m])) > 500
        labels: { severity: critical }
        annotations: { summary: "More than 500 failed sign-ins in 5 minutes (active attack)" }

      # MFA guessing: a valid password was used but the second factor keeps failing.
      - alert: MastemyMfaFailures
        expr: sum(increase(mastemy_security_events_total{category="mfa_failure"}[10m])) > 20
        labels: { severity: warning }
        annotations: { summary: "More than 20 failed MFA verifications in 10 minutes" }

      # Any refresh-token reuse means a stolen or replayed token; the family is already revoked.
      - alert: MastemyRefreshTokenReuse
        expr: sum(increase(mastemy_security_events_total{category="token_reuse"}[5m])) > 0
        labels: { severity: critical }
        annotations: { summary: "Refresh-token reuse detected (session family revoked); investigate the user's sessions and audit log" }

      # Sustained rate limiting: abusive client or a misconfigured integration.
      - alert: MastemyRateLimited
        expr: sum(rate(mastemy_security_events_total{category="rate_limited"}[5m])) * 60 > 30
        for: 10m
        labels: { severity: warning }
        annotations: { summary: "More than 30 rate-limited requests per minute for 10 minutes" }

      # Authorization probing: many 403s usually means someone is enumerating admin/staff endpoints.
      - alert: MastemyForbiddenSpike
        expr: sum(increase(mastemy_security_events_total{category="forbidden"}[5m])) > 50
        for: 5m
        labels: { severity: warning }
        annotations: { summary: "More than 50 forbidden (403) responses in 5 minutes" }
```

Grafana: one time-series panel `sum by (category) (rate(mastemy_security_events_total[5m]))` plus a stat panel per rule
above is enough; use the same thresholds for Grafana-managed alerts.

## Built-in threshold notifier (in-app)

`SecurityAlertNotifier` sends an in-app notification of kind `trust_safety` (link `/admin/audit`) to every Admin and
SuperAdmin when:

* one client IP produces more than `Security:Alerts:LoginFailuresPerIpThreshold` (default **50**) login failures within
  `Security:Alerts:WindowMinutes` (default **5**) minutes, or
* any refresh-token reuse is detected.

Each IP / user alerts at most once per `Security:Alerts:CooldownMinutes` (default **30**). Disable with
`Security__Alerts__Enabled=false`. State is in memory per API instance, so with several replicas each counts its own
traffic; rely on the Prometheus rules for fleet-wide thresholds. Delivery failures are logged and never affect the
request that triggered them. Admins can mute or route the `trust_safety` kind (e-mail) in their notification
preferences.
