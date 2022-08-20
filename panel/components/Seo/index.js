import Head from 'next/head'
import React from 'react'

const Seo = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name='description' content={description} />}
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}

export default Seo
