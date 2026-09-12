import type { IncomingMessage, ServerResponse } from 'node:http'
import { handleApiRequest, writeResult } from './_lib/forms'

// Vercel Node.js function. Vercel parses JSON onto req.body and throws when
// the body is not valid JSON, which is reported as a 400.
export default async function handler(req: IncomingMessage & { body?: unknown }, res: ServerResponse) {
  let body: unknown
  let bodyError = false
  try {
    body = req.body
  } catch {
    bodyError = true
  }
  writeResult(res, await handleApiRequest('submit', { method: req.method, headers: req.headers, body, bodyError }))
}
