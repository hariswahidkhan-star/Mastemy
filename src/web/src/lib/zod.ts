import { z } from 'zod';

// Zod 4 probes `new Function` to JIT-compile object parsers. The Content-Security-Policy forbids eval, so
// the probe would log a CSP violation on every page with a form; use the interpreted parser instead.
z.config({ jitless: true });

export { z };
