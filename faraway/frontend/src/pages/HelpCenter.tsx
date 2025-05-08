import React from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import useDecodedToken from '../utils/DecodeToken';
import notWorking from '../assets/notworking.png';


const HelpCenter = () => {
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
        <main className="flex-1 flex justify-center items-center">
            <div className="flex flex-col items-center text-center">
                <img src={notWorking} alt="notWorking" className="w-100 h-100 object-contain" />
                <p className="text-2xl text-[#404040] font-bold">
                We’re currently working on this <br />
                feature. Come back soon!
                </p>
            </div>
        </main>
      </div>
    </div>
  );
};

export default HelpCenter;
