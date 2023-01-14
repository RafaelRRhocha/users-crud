import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/main.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>USERS CRUD</title>
      <Component {...pageProps} />
    </>
  )
}