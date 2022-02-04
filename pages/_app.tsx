import type { AppProps } from 'next/app'
import "/styles/tailwind.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5570463079801584" crossOrigin="anonymous"></script>
    </>
  )
}

export default MyApp
