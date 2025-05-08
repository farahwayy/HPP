import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import placeholderProfile from '../assets/placeholderProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCircleDollarToSlot, 
  faFilePrescription 
} from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@iconify/react';

const Nav = ({ user }) => {
  const [patient] = useState(user);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkBaseClasses = 'flex items-center gap-3 px-4 py-2 rounded transition text-white';
  const activeClasses = 'bg-[#49C0FF]'; 
  const hoverClasses = 'hover:bg-[#49C0FF]';

  return (
    <aside className='w-64 bg-[#005F92] text-white min-h-full'>
      <div className='flex flex-col justify-center items-center mt-10 mb-6'>
        <img 
          src={placeholderProfile} 
          alt="placeholderProfile" 
          className='w-24 h-24 rounded-full mb-3'
        />
        <h1 className='font-bold text-lg'>{patient?.name}</h1>
        <h2 className='text-sm'>Patient</h2>
      </div>

      <div className='px-6'>
        <h1 className='text-lg font-semibold ml-4 mb-2'>MAIN</h1>
        <nav className='flex flex-col'>
          <a 
            href="/landing"
            className={`${linkBaseClasses} ${isActive('/landing') ? activeClasses : hoverClasses}`}
          >
            <Icon icon="material-symbols:dashboard" className="w-5" />
            <span className='font-medium'>Dashboard</span>
          </a>
          <a 
            href="/medicalrecord"
            className={`${linkBaseClasses} ${isActive('/medicalrecord') ? activeClasses : hoverClasses}`}
          >
            <Icon icon="material-symbols:prescriptions" className="w-5" />
            <span className='font-medium'>Medical Record</span>
          </a>
          <a 
            href="/billing"
            className={`${linkBaseClasses} ${isActive('/billing') ? activeClasses : hoverClasses}`}
          >
            <FontAwesomeIcon icon={faCircleDollarToSlot} className="w-5" />
            <span className='font-medium'>Billing</span>
          </a>
          <a 
            href="/prescriptions"
            className={`${linkBaseClasses} ${isActive('/prescriptions') ? activeClasses : hoverClasses}`}
          >
            <FontAwesomeIcon icon={faFilePrescription} className="w-5" />
            <span className='font-medium'>Prescriptions</span>
          </a>
        </nav>
      </div>

      <div className='px-6 mt-10'>
        <h1 className='text-lg font-semibold ml-4 mb-2'>SUPPORT</h1>
        <nav className='flex flex-col'>
          <a 
            href="/helpcenter"
            className={`${linkBaseClasses} ${isActive('/helpcenter') ? activeClasses : hoverClasses}`}
          >
            <Icon icon="iconamoon:shield-yes-fill" className="w-5" />
            <span className='font-medium'>Help Center</span>
          </a>
          <a 
            href="/settings"
            className={`${linkBaseClasses} ${isActive('/settings') ? activeClasses : hoverClasses}`}
          >
            <Icon icon="ic:baseline-settings" className="w-5" />
            <span className='font-medium'>Settings</span>
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default Nav;
