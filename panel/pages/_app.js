import React from 'react'
import '../styles/globals.css'

import Layout from '../components/Layout'

const App = ({ Component, pageProps }) => {
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default App
