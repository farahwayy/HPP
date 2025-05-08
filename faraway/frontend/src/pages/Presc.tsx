import React from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import useDecodedToken from '../utils/DecodeToken';
import SearchBar from '../components/SearchBar';


const Prescriptions = () => {
    const patient = useDecodedToken();

    if (!patient) {
      return <div className="p-10">Loading profile...</div>;
    }

  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <Header />
      </header>
      <main className='flex flex-1'>
        <Nav user={patient} />
        <div className='flex-1'>
          <SearchBar 
              title={'Prescriptions'} 
              description={'View your Health Information'}
              data={'Prescriptions'}
            />
        </div>
      </main>
    </div>
  );
};

export default Prescriptions;
