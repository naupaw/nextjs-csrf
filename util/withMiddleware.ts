import Tokens from 'csrf'
import nc from 'next-connect'
import { parseCookies } from 'nookies'

const tokens = new Tokens()

const withMiddleware = async (req, res) => {
  const handler = nc().use((req, res, next) => {
    const cookies = parseCookies({ req })

    if (new RegExp('^/api', 'i').test(req.url)) {
      if (!tokens.verify(cookies._csrf || '', req.headers['x-xsrf-token'])) {
        return res.status(403).json({ message: 'csrf_token_invalid' })
      }
    }

    const secret = cookies._csrf || tokens.secretSync()

    req.token = tokens.create(secret)
    res.setHeader('Set-Cookie', [
      `_csrf=${secret}; path=/`,
      `XSRF-TOKEN=${tokens.create(secret)};  path=/`,
    ])
    next()
  })

  return await handler.apply(req, res)
}

export default withMiddleware
