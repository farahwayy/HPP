import React, { useEffect, useState } from 'react'
import Button from '../components/Button';
import Header from '../components/Header';
import Nav from '../components/Nav';

const Landing = ({user}) => {
  const [patient, setPatient] = useState(user);
  
  const firstName = patient.name.split(' ')[0];

  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <Header />
      </header>
      <div className='flex flex-1'>
        <Nav user={patient} />
        <main className='flex-1 p-6'>
          <h1>Good Day, <span className="text-primary font-black">{firstName}</span>!</h1>
          <p>We’re here to help you stay healthy—check in regularly to stay up to date on your health and care plan.</p>
        </main>
      </div>

    </div>
  )
}

export default Landing
