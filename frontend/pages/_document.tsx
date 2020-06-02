import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document<any> {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      // wraps the collectStyles provider around our <App />.
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      // extract the initial props that may be present.
      const initialProps = await Document.getInitialProps(ctx)
      
      // returning the original props together with our styled components.
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="fr">
        <Head>
          {this.props.styleTags /*rendering the actually stylesheet*/}
          <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png"/>
          <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png"/>
          <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" href="/favicon/favicon.ico"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
          <link rel="manifest" href="/favicon/site.webmanifest"/>
          <meta name="theme-color" content="#FFF"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
  
}