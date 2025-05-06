import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import placeholderProfile from '../assets/placeholderProfile.png';
import Button from '../components/Button';

const Profile = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <header>
            <Header />
        </header>
        <div className='flex flex-1'>
            <Nav />
            <div className='flex-1'>
                <div className='border-b border-[#9E9E9E] p-6'>
                    <h1 className='text-5xl text-[#005F92] font-semibold'>Patient Profile</h1>
                    <div className='flex justify-between m-10'>
                        <div className='flex items-center gap-10'>
                            <img 
                                src={placeholderProfile} 
                                alt="placeholderProfile"
                                className='w-50 h-50 rounded-full mb-3' 
                                />
                            <div className='flex flex-col'>
                                <h1 className='text-3xl font-semibold text-[#404040]'>Patient Name</h1>
                                <h3 className='text-[#525252]'>Patient ID: PT-20250001 | Male, 44</h3>
                            </div>

                        </div>
                        <div className='flex items-center'>
                            <Button text={'Edit Profile'}></Button>
                        </div>
                    </div>
                </div>
                
                {/* Contact Info */}
                <div className='flex flex-col items-center justify-center p-10 gap-10'>
                    <div className="bg-gray-50 p-6 rounded-lg w-full">
                        <h2 className="text-2xl text-gray-900 mb-4">
                            Contact Information
                        </h2>
                        <hr className="border-gray-200 mb-6" />
                        <div className="space-y-6">
                            <div className="flex">
                                <div className="w-1/3 text-[#525252]">Phone</div>
                                <div className="w-2/3">09193756332</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/3 text-[#525252]">Email</div>
                                <div className="w-2/3">markdoe00@gmail.com</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/3 text-[#525252]">Address</div>
                                <div className="w-2/3">Barangay Calauag, Naga City</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/3 text-[#525252]">Date of Birth</div>
                                <div className="w-2/3">May 12, 1980</div>
                            </div>
                        </div>
                    </div>

                    {/* Medical Info */}
                    <div className="bg-gray-50 p-6 rounded-lg w-full">
                        <h2 className="text-2xl text-gray-900 mb-4">
                            Contact Information
                        </h2>
                        <hr className="border-gray-200 mb-6" />
                        <div className="space-y-6">
                            <div className="flex">
                                <div className="w-1/3 text-[#525252]">Primary Doctor</div>
                                <div className="w-2/3">Dr. Patricia Estrella</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/3 text-[#525252]">Blood Type</div>
                                <div className="w-2/3">O+</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/3 text-[#525252]">Allergies</div>
                                <div className="w-2/3">Peanuts, Seafood</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/3 text-[#525252]">Medications</div>
                                <div className="w-2/3">Atorvastatin 20mg - Once daily at bedtime |  Metformin 500mg - Twice daily with meals</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Profile