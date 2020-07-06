import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import withMiddleware from '../util/withMiddleware'
export default ({ token }) => {
  const [name, setName] = useState('')
  useEffect(() => {
    const callApi = async () => {
      const { data } = await axios.get('/api/hello')
      setName(data.message)
    }
    callApi()
  }, [setName])

  return (
    <div className='main'>
      <h1>hello {name}</h1>
      <p>
        Direct access without x-xsrf-token header{' '}
        <a href='/api/hello' target='_blank' rel='noopener noreferrer'>
          /api/hello
        </a>
      </p>
      <pre>
        Check devtools for see request payload{'\n\n'}
        In case you want render csrf token to html page {'\n\n'}CSRF TOKEN:{' '}
        {token}
      </pre>
      <style jsx>{`
        .main {
          font-family: sans-serif;
        }
      `}</style>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    await withMiddleware(req, res)
    return { props: { token: (req as any).token } }
  } catch (e) {
    //...
  }
  return { props: { statusCode: 500 } }
}
