import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/main.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>Cadastro de Clientes</title>
      <Component {...pageProps} />
    </>
  )
}
