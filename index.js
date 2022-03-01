import { AwsClient } from 'aws4fetch'

const hostname = '.storage.googleapis.com'
const bucket = GCS_BUCKET

const aws = new AwsClient({
  accessKeyId: GCS_KEY,
  secretAccessKey: GCS_SECRET,
  service: 's3',
})

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const token = getTokenFromHeader(request)
  if (!token) {
    return new Response(null, {status: 401})
  }
  const value = await TOKENS.get(token)
  if (value === null) {
    return new Response(null, {status: 401})
  }

  const { method, body } = request
  const url = new URL(request.url)
  url.hostname = bucket + hostname
  return aws.fetch(url, { method, body })
}

function getTokenFromHeader(request) {
  let data = request.headers.get("authorization")
  if (!data) data = request.headers.get("Authorization")
  const prefix = 'Bearer '
  return data && data.startsWith(prefix) ? data.slice(prefix.length) : null
}
