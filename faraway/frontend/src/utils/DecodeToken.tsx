import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useDecodedToken = () => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setPatient(decoded);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);

  return patient;
};

export default useDecodedToken;