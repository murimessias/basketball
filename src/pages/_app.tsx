import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { darkTheme } from 'libs/stitches'
import { globalStyles } from 'styles/globals'

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: unknown }>) {
  globalStyles()
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider
          attribute='class'
          disableTransitionOnChange
          value={{ light: 'light-theme', dark: darkTheme.className }}
          defaultTheme='system'
        >
          <Component {...pageProps} />
        </ThemeProvider>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
