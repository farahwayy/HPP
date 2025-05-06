import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/Index';
import Landing from './pages/Landing';
import Login from './utils/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import Profile from './pages/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='login' element={<Login />} ></Route>
          <Route path='/profile' element={<Profile /> } />
          <Route path='/landing' element={ <ProtectedRoute><Landing/></ProtectedRoute> } />
          <Route path='*' />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
