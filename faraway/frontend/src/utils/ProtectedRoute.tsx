import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios';

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');
    console.log("protected route is called")

    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({})


    useEffect(() => {
        const VerifyToken = async () => {
          try {
            const res = await axios.get('http://localhost:7000/verify', {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            })
          
            if (res.data.valid) {
              setIsAuth(true);
              setUser(res.data.user)
              console.log(res.data.user)
            } else {
              setIsAuth(false);
            }
          } catch (err) {
            console.log("Error verifying token:", err);
            setIsAuth(false);
          } finally {
            setLoading(false);
          }
        };
    
        if (token) {
          VerifyToken();
        } else {
          setLoading(false);
          setIsAuth(false);
        }
      }, [token]);

    if(loading) return <p>Loading....</p>
    
    if(!isAuth){
        return <Navigate to={'/'} replace />
    }
 

  return React.cloneElement(children, {user});
}

export default ProtectedRoute
