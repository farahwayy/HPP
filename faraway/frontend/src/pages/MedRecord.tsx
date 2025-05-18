import React, { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import useDecodedToken from '../utils/DecodeToken';
import SearchBar from '../components/SearchBar';
import Filter from '@/components/Filter';
import { sortOptions, typeOptions } from '@/utils/filterOptions';
import MedicalTable from '@/components/MedTable';
import MedResults from '@/components/MedResults';
import ChatBot from '@/components/ChatBot';

const MedicalRecord = () => {
  const [sortOrder, setSortOrder] = useState("newest");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const patient = useDecodedToken();

  const handleViewDetails = (item) => {
    setSelectedRecord(item);
  };

  const handleBack = () => {
    setSelectedRecord(null);
  };

  if (!patient) {
    return <div className="p-10">Loading profile...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Header />
      </header>
      <div className="flex flex-1">
        <Nav user={patient} />
          <div className="flex-1">
            {selectedRecord ? (
              <MedResults PatientData={selectedRecord} onBack={handleBack} />
            ) : (
              <>
                <SearchBar
                  title="Medical Records"
                  description="View and manage your health information"
                  data="Records"
                />
                <div className="flex flex-col justify-between p-15">
                  <div className="flex-col">
                    <h1 className="text-3xl font-medium">All Records</h1>
                    <p className="text-lg font-medium text-[#9E9E9E]">
                      Click on a record to view details
                    </p>
                  </div>
                  <div className="flex justify-end mb-10 gap-3">
                    <Filter
                      value={typeFilter}
                      onChange={setTypeFilter}
                      options={typeOptions}
                      placeholder="Filter by Type"
                    />
                    <Filter
                      value={sortOrder}
                      onChange={setSortOrder}
                      options={sortOptions}
                      placeholder="Sort by"
                    />
                  </div>
                  <div>
                    <MedicalTable
                      sortOrder={sortOrder}
                      typeFilter={typeFilter}
                      onViewDetails={handleViewDetails} // <-- callback passed
                    />
                  </div>
                </div>
              </>
            )}
          </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default MedicalRecord;
