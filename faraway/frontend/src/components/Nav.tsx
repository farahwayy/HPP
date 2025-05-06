import React, { useState } from 'react';
import placeholderProfile from '../assets/placeholderProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCircleDollarToSlot, 
  faFilePrescription 
} from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@iconify/react';

const Nav = ({ user }) => {
  const [patient, setPatient] = useState(user);

  return (
    <aside className='w-64 bg-[#005F92] text-white min-h-full'>
      
      <div className='flex flex-col justify-center items-center mt-10 mb-6'>
        <img 
          src={placeholderProfile} 
          alt="placeholderProfile" 
          className='w-24 h-24 rounded-full mb-3'
        />
        <h1 className='font-bold text-lg'>{patient?.name}</h1>
        <h2 className='text-sm text-gray-300'>Patient</h2>
      </div>

      
      <div className='px-6'>
        <h1 className='text-lg font-semibold ml-4 mb-2'>MAIN</h1>
            <nav className='flex flex-col'>
                <a 
                href="#" 
                className='flex items-center gap-3 px-4 py-2 rounded hover:bg-[#00446b] transition text-white'
                >
                <Icon icon="material-symbols:dashboard" className="w-5" />
                <span>Dashboard</span>
                </a>
                <a 
                href="#" 
                className='flex items-center gap-3 px-4 py-2 rounded hover:bg-[#00446b] transition text-white'
                >
                <Icon icon="material-symbols:prescriptions" className="w-5" />
                <span>Medical Record</span>
                </a>
                <a 
                href="#" 
                className='flex items-center gap-3 px-4 py-2 rounded hover:bg-[#00446b] transition text-white'
                >
                <FontAwesomeIcon icon={faCircleDollarToSlot} className="w-5" />
                <span>Billing</span>
                </a>
                <a 
                href="#" 
                className='flex items-center gap-3 px-4 py-2 rounded hover:bg-[#00446b] transition text-white'
                >
                <FontAwesomeIcon icon={faFilePrescription} className="w-5" />
                <span>Prescriptions</span>
                </a>
            </nav>
        </div>

        <div className='px-6 mt-10'>
        <h1 className='text-lg font-semibold ml-4 mb-2'>SUPPORT</h1>
            <nav className='flex flex-col'>
                <a 
                href="#" 
                className='flex items-center gap-3 px-4 py-2 rounded hover:bg-[#00446b] transition text-white'
                >
                <Icon icon="iconamoon:shield-yes-fill" className="w-5" />
                <span>Dashboard</span>
                </a>
                <a 
                href="#" 
                className='flex items-center gap-3 px-4 py-2 rounded hover:bg-[#00446b] transition text-white'
                >
                <Icon icon="ic:baseline-settings" className="w-5" />
                <span>Settings</span>
                </a>
            </nav>
        </div>
    </aside>
  );
};

export default Nav;
