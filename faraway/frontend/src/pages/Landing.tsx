import React, { useState } from 'react'
import Header from '../components/Header';
import Nav from '../components/Nav';


const Landing = ({user}) => {
  const [patient, setPatient] = useState(user);
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  
  const firstName = patient.name.split(' ')[0];

  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <Header />
      </header>
      <div className='flex flex-1'>
        <Nav user={patient} />
        <main className='flex-1 p-8'>
          <h1>Good Day, <span className="text-primary font-black">{firstName}</span>!</h1>
          <p>We’re here to help you stay healthy—check in regularly to stay up to date on your health and care plan.</p>

        </main>
      </div>
    </div>
  )
}

export default Landing