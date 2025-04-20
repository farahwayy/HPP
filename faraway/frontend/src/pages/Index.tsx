import React from 'react'
import Button from '../components/Button'

const Index = () => {
  return (
    <div>
      <h1>Hello!</h1>
      <Button text={'Login With Google'} onClick={() => window.location.href='http://localhost:7000/login/google' } className={'flex items-center justify-center gap-2 px-4 py-2 w-full max-w-xs bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-100 focus:outline-none'}></Button>
    </div>
  )
}

export default Index
