/**
 * Security and validation tests for the form API (api/_lib/forms.ts), run
 * against the same handler the Vercel functions and the dev server use.
 * Nothing is sent to the Google Sheet: the webhook URL is unset under both of
 * its names, so a submission that passes every check comes back as an honest 502.
 *
 *   npm run test:forms
 */
import { handleApiRequest, sheetSafe, setting, adminEmail, HONEYPOT_FIELD } from '../api/_lib/forms'

// Both spellings, or a machine that has the old NEXT_PUBLIC_ name configured
// would forward these test submissions to the live Google Sheet.
delete process.env.GOOGLE_APPS_SCRIPT_URL
delete process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL
delete process.env.ADMIN_EMAIL
delete process.env.NEXT_PUBLIC_ADMIN_EMAIL

let ipCounter = 0
const freshIp = () => `203.0.113.${++ipCounter}`

type Kind = 'submit' | 'community'
const request = (
  kind: Kind,
  body: unknown,
  { origin = 'https://www.trenchsecurity.ai', contentType = 'application/json', method = 'POST', ip = freshIp() } = {},
) =>
  handleApiRequest(kind, {
    method,
    headers: { origin, 'content-type': contentType, 'x-real-ip': ip },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })

const connect = { fullName: 'Test Lead', email: 'test@acme-example.com', teamSize: '1-10', intent: 'Demo', contactNumber: '+14155552671' }
const bpl = { firstName: 'A', lastName: 'B', email: 'a@acme-example.com', phone: '+14155552671', designation: 'Analyst', linkedin: 'https://linkedin.com/in/ab' }

let failures = 0
function expect(label: string, actual: unknown, expected: unknown) {
  const ok = actual === expected
  if (!ok) failures++
  console.log(`  ${ok ? '✅' : '❌'} ${label.padEnd(62)} ${ok ? '' : `expected ${expected}, got ${actual}`}`)
}

async function main() {
  console.log('── request gate ──')
  expect('GET is rejected (405)', (await request('submit', connect, { method: 'GET' })).httpStatus, 405)
  expect('foreign origin is rejected (403)', (await request('submit', connect, { origin: 'https://evil.example' })).httpStatus, 403)
  expect('missing origin is rejected (403)', (await request('submit', connect, { origin: '' })).httpStatus, 403)
  expect('non-JSON content type is rejected (415)', (await request('submit', connect, { contentType: 'text/plain' })).httpStatus, 415)
  expect('malformed JSON is rejected (400)', (await request('submit', '{"fullName":')).httpStatus, 400)
  expect('JSON array body is rejected (400)', (await request('submit', [connect])).httpStatus, 400)
  expect('oversized body is rejected (413)', (await request('submit', { ...connect, message: 'x'.repeat(40_000) })).httpStatus, 413)

  console.log('── spam controls ──')
  const trapped = await request('submit', { ...connect, [HONEYPOT_FIELD]: 'https://spam.example' })
  // 200 without a backend configured proves the submission was dropped, not forwarded.
  expect('honeypot filled: bot sees success (200), nothing forwarded', trapped.httpStatus, 200)
  const ip = freshIp()
  const statuses: number[] = []
  for (let i = 0; i < 6; i++) statuses.push((await request('submit', connect, { ip })).httpStatus)
  expect('6th submission from one IP in 10 min is limited (429)', statuses[5], 429)

  console.log('── field validation (Connect / MSSP) ──')
  expect('missing required fields (400)', (await request('submit', {})).httpStatus, 400)
  expect('personal email rejected server-side (400)', (await request('submit', { ...connect, email: 'lead@gmail.com' })).httpStatus, 400)
  expect('malformed email (400)', (await request('submit', { ...connect, email: 'not-an-email' })).httpStatus, 400)
  expect('name over 120 chars (400)', (await request('submit', { ...connect, fullName: 'x'.repeat(121) })).httpStatus, 400)
  expect('message over 4000 chars (400)', (await request('submit', { ...connect, message: 'x'.repeat(4001) })).httpStatus, 400)
  expect('non-string field (400)', (await request('submit', { ...connect, fullName: { $gt: '' } })).httpStatus, 400)
  expect('phone with letters (400)', (await request('submit', { ...connect, contactNumber: '=HYPERLINK("x")' })).httpStatus, 400)
  expect('valid lead, backend down: honest error (502)', (await request('submit', connect)).httpStatus, 502)

  console.log('── field validation (BPL) ──')
  expect('personal email rejected (400)', (await request('community', { ...bpl, email: 'a@gmail.com' })).httpStatus, 400)
  expect('non-LinkedIn profile URL rejected (400)', (await request('community', { ...bpl, linkedin: 'https://twitter.com/ab' })).httpStatus, 400)
  expect('invalid phone rejected (400)', (await request('community', { ...bpl, phone: 'call me' })).httpStatus, 400)
  expect('valid signup, backend down: honest error (502)', (await request('community', bpl)).httpStatus, 502)

  console.log('── configuration ──')
  process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/legacy/exec'
  expect("old NEXT_PUBLIC_ name still works", setting('GOOGLE_APPS_SCRIPT_URL'), 'https://script.google.com/macros/s/legacy/exec')
  process.env.GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/current/exec'
  expect('unprefixed name wins when both are set', setting('GOOGLE_APPS_SCRIPT_URL'), 'https://script.google.com/macros/s/current/exec')
  process.env.NEXT_PUBLIC_ADMIN_EMAIL = 'leads@trenchsecurity.ai'
  expect('old NEXT_PUBLIC_ADMIN_EMAIL still works', adminEmail(), 'leads@trenchsecurity.ai')
  process.env.NEXT_PUBLIC_ADMIN_EMAIL = 'not-an-email'
  expect('unusable ADMIN_EMAIL falls back to the default', adminEmail(), 'ask@trenchsecurity.ai')
  delete process.env.NEXT_PUBLIC_ADMIN_EMAIL

  // The webhook URL is the request target, so these must be refused before any
  // request goes out — otherwise a wrong value posts your leads to that host.
  process.env.GOOGLE_APPS_SCRIPT_URL = 'https://evil.example/collect'
  expect('webhook URL off google.com is refused (502)', (await request('submit', connect)).httpStatus, 502)
  process.env.GOOGLE_APPS_SCRIPT_URL = 'http://script.google.com/macros/s/x/exec'
  expect('plain-http webhook URL is refused (502)', (await request('submit', connect)).httpStatus, 502)
  process.env.ADMIN_EMAIL = 'leads@trenchsecurity.ai'
  const named = await request('submit', connect)
  expect('the error names the configured address', named.body.message.includes('leads@trenchsecurity.ai'), true)
  delete process.env.GOOGLE_APPS_SCRIPT_URL
  delete process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL
  delete process.env.ADMIN_EMAIL

  console.log('── Google Sheet formula injection ──')
  expect('=IMPORTXML(...) stored as text', sheetSafe('=IMPORTXML("https://x","//a")'), `'=IMPORTXML("https://x","//a")`)
  expect('+cmd|... stored as text', sheetSafe('+cmd|calc'), `'+cmd|calc`)
  expect('@SUM(...) stored as text', sheetSafe('@SUM(A1)'), `'@SUM(A1)`)
  expect('-2+3 stored as text', sheetSafe('-2+3'), `'-2+3`)
  expect('ordinary value unchanged', sheetSafe('Jane Doe'), 'Jane Doe')

  console.log(failures ? `\nFORM API TESTS FAILED (${failures})` : '\nFORM API TESTS PASSED')
  process.exitCode = failures ? 1 : 0
}

main()
