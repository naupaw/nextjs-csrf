# Nextjs CSRF POC (Proof of Concept)

According to [wikipedia](https://en.wikipedia.org/wiki/Cross-site_request_forgery)

> Cross-site request forgery, also known as one-click attack or session riding and abbreviated as CSRF (sometimes pronounced sea-surf) or XSRF, is a type of malicious exploit of a website where unauthorized commands are transmitted from a user that the web application trusts.

Just a bare minimal implementation using csrf token with [nextjs](https://nextjs.org/)

Module i used

- https://github.com/pillarjs/csrf
- https://github.com/maticzav/nookies
- https://github.com/hoangvvo/next-connect

There are some rules in this case

- Csrf secret stored in `_csrf` cookie.
- Csrf token stored in `x-xsrf-token` cookie, _latter to be used for XHR/API call_.
  - In this case i will use [axios](https://github.com/axios/axios) for calling api since the module has built action for carries `x-xsrf-token` automatically
- Restriction only applied on `/api/*` path
- Csrf token also available in `req.token` if you decide to put the token into `pageProps` by using `getServerSideProps`
