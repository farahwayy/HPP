import React, { useState, useEffect } from 'react'
import LOGO from '../assets/Group 3.png'
import placeholderProfile from '../assets/placeholderProfile.png'

const Header = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const timeString = now.toLocaleTimeString('en-PH', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const dateString = now.toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex justify-between items-center border px-10 py-6 mx-auto'>
      <div>
        <img src={LOGO} alt="logo" className='h-10' />
      </div>
      <div className='flex gap-25 items-center'>
        <div className='flex flex-row gap-10'>
            <h3>Day <span className="font-bold">{currentDate}</span></h3>
            <h3>Time <span className="font-bold">{currentTime}</span></h3>
        </div>
        <div>
            <img 
                src={placeholderProfile} 
                alt="placeholderProfile"
                className='max-w-13'
            />
        </div>
      </div>
    </div>
  )
}

export default Header
