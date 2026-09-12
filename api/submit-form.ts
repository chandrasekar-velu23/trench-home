import type { IncomingMessage, ServerResponse } from 'node:http'
import { handleApiRequest, writeResult } from './_lib/forms'

// Vercel Node.js function. Vercel parses JSON onto req.body and throws when
// the body is not valid JSON, which is reported as a 400.
export default async function handler(req: IncomingMessage & { body?: unknown }, res: ServerResponse) {
  try {
    let body: unknown
    let bodyError = false
    try {
      body = req.body
    } catch {
      bodyError = true
    }
    const result = await handleApiRequest('submit', { method: req.method, headers: req.headers, body, bodyError })
    writeResult(res, result)
  } catch (err) {
    console.error('[submit-form handler error]:', err)
    writeResult(res, {
      httpStatus: 500,
      body: { status: 'error', message: 'Internal server error. Please try again or email ask@trenchsecurity.ai.' },
    })
  }
}
