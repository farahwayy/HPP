import React from 'react'

const Button = ({text="Click Me", className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer', onClick}) => {
  return (
        <button className={className + ' cursor-pointer px-4 py-2 bg-blue-500 rounded-md '}  onClick={onClick}>{text}</button>
  )
}

export default Button
