import React, { useEffect, useState } from 'react'

const Login = () => {
  const [user, setUser] = useState({ name: 'Pedro', email: 'pedro@gmail.com' });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    if (token) {
      localStorage.setItem('token', token);
      console.log('Stored Successfully')
      window.location.href='http://localhost:5173/landing'
    }else{
        window.location.href='http://localhost:5173/'
    }
  },[])

  return (
    <div>
      <h1>Hello  there {user.name}!</h1>
    </div>
  )
}

export default Login
