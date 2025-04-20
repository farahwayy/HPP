import React, { useEffect, useState } from 'react'
import Button from '../components/Button';

const Landing = ({user}) => {
  const [patient, setPatient] = useState(user);
  

  return (
    <div>
      <h1>Welcome <span className="text-primary font-black">{patient.name}</span>!</h1>
      <p>Email: <span className='text-primary font-black'>{patient.email}</span></p>
      <Button onClick={() => {
        localStorage.removeItem('token');
        alert("Logging out....");
        window.location.reload();
      }} text={'Logout'} />
    </div>
  )
}

export default Landing
