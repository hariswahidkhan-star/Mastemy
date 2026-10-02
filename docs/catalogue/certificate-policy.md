# Certificate and Disclaimer Policy (static)

Implements master prompt sections 3 and 10. Enforced per row by `validate_catalogue.py` (`certificate_type`, `certificate_wording`, `completion_rule_id`, `credential_disclaimer_id`).

## What Mastemy issues
- **Mastemy Certificate of Completion** only (`certificate_type = mastemy-certificate-of-completion`), for every skills course and, labelled as such, for preparation courses.
- Skills wording: `Mastemy Certificate of Completion — <exact course title>` (for example "Mastemy Certificate of Completion — AI in Excel for Financial Analysis").
- Preparation-course wording (exact): "Completion of independent preparation course; does not award the external professional certification or license."
- Mastemy never issues a Microsoft Certified, CFA, CPA, ACCA, NCLEX, IELTS or any other third-party credential, licence, CPE/CPD/PDU, contact hours or academic credit. No partnership, accreditation or authorised-training relationship exists; none may be implied.

## Completion rule `CR-DEFAULT-75-80` (configurable by administrators)
1. Complete every required module and required assessment.
2. Score at least **75%** on each module check.
3. Score at least **80%** on the final assessment (protected item pool).
4. Targeted review is assigned when a threshold is missed; retakes draw alternate items.
5. Opening a video or playing a playlist does not count as completion.

These are Mastemy learning thresholds, not the pass mark of any external examination, and platform scores do not predict scaled external scores.

## Certificate content
Learner name; exact course title; Mastemy as issuer; completion date; course version; planned learning hours with their definition ("planned required minutes, 80% instruction and 20% assessment and answer review; not issuer-eligible training hours"); unique certificate ID; verification route. A QR code may point only to a real, configured Mastemy verification endpoint. Issuance and revocation are stored as auditable records. Learners control whether their full name and results are publicly visible; scores are not shown on public verification by default.

## Disclaimers
- **DISC-CERTPREP-02** (independent certification-exam preparation): "Independent preparation course created by Mastemy. Mastemy is not affiliated with, endorsed by, sponsored by or approved by [issuer]. Completing it does not award the external certification and does not guarantee an exam pass. Exam details change; check the issuer's official site."
- **DISC-REGULATED-02** (licensing, healthcare, legal, tax and other regulated examinations): DISC-CERTPREP-02 plus "This course is knowledge preparation only. It is not clinical, legal or professional training, does not satisfy any education, supervision or experience requirement, and does not replace licensed professional judgement."
- **DISC-SKILLS-02** (skills courses): "This Mastemy certificate confirms completion of a Mastemy course. It is not a professional qualification, licence or vendor certification."

## Trademark notice
Exam, product and certification names belong to their owners and identify the exam or product taught. No vendor logos, badges or trade dress on certificates, thumbnails or videos.

## Prohibited claims
"Official", "authorised training partner", "accredited", "endorsed"; guaranteed pass rates; salary or employment outcomes; fabricated reviews, enrolment counts or instructor credentials.
