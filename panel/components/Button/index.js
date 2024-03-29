import Link from 'next/link'
import React from 'react'

const Button = ({ children, type = 'submit', ...props }) => {
  return (
    <button
      type={type}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      {...props}
    >
      {children}
    </button>
  )
}
const ButtonLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        {children}
      </a>
    </Link>
  )
}
const ButtonLinkOutline = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
        {children}
      </a>
    </Link>
  )
}
Button.Link = ButtonLink
Button.LinkOutline = ButtonLinkOutline

export default Button
