import { QueryClient, QueryClientProvider } from 'react-query'

import type { AppProps } from 'next/app'

import '../styles/globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
