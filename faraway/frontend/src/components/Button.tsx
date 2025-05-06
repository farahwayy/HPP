import React from 'react'

const Button = ({
  text = "Click Me",
  className = 'px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600',
  onClick,
  icon // Add icon support
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 ${className}`}
    >
      {icon && <img src={icon} alt="icon" className="w-5 h-5" />}
      {text}
    </button>
  )
}

export default Button
