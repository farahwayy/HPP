import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/Index';
import Landing from './pages/Landing';
import Login from './utils/Login';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen justify-center items-center">
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='login' element={<Login />} ></Route>
          <Route path='/landing' element={ <ProtectedRoute><Landing/></ProtectedRoute> } />
          <Route path='*' />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
