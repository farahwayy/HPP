import React from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import useDecodedToken from '../utils/DecodeToken';


const Billing = () => {
    const patient = useDecodedToken();

    if (!patient) {
      return <div className="p-10">Loading profile...</div>;
    }

  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <Header />
      </header>
      <div className='flex flex-1'>
        <Nav user={patient} />
        <main className='flex-1'>
          
        </main>
      </div>
    </div>
  );
};

export default Billing;
