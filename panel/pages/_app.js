import React from 'react'
import Layout from '../components/Layout'
import '../css/styles.css'

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
