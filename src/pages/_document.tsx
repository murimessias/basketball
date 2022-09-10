import { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from 'libs/stitches'

export default function Document() {
  return (
    <Html>
      <Head>
        <style
          id='stitches'
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
