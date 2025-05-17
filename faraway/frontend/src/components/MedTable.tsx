import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const MedicalTable = ({ sortOrder, typeFilter, onViewDetails }) => {
  const [patient, setPatient] = useState([]);
  const [loading, setLoading] = useState(true)


  const { email } = jwtDecode(localStorage.getItem('token'))

  useEffect(() => {
    setLoading(true)
    try {
      const fetchData = async () => {
        const data = await axios.get('http://localhost:7000/patientData', {
          params: {
            email: email
          }
        })
        setPatient(data.data.data)
      }
      fetchData()
    } catch (err) {
      console.log('Cannot fetch Patient Data', err)
    } finally {
      setLoading(false)
    }


  }, [])

  const PatientData = patient


  const filteredData = typeFilter === "all"
    ? PatientData
    : PatientData.filter((item) => {
      const typeMap = {
        lab: "Lab Results",
        visitnotes: "Visit Notes",
        imaging: "Imaging",
        specialist: "Specialist",
        Vaccination: "Vaccination"
      };
      return item.type === typeMap[typeFilter];
    });

  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.date || "1970-01-01");
    const dateB = new Date(b.date || "1970-01-01");
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  if (loading) {
    return <><h1>Loading...</h1></>
  }


  return (
    <Table className="border border-[#DCDCDC]">
      <TableHeader className="border-b border-[#DCDCDC]">
        <TableRow className="bg-[#F6F6F6]">
          <TableHead className="text-[#525252] py-5 text-lg font-extralight">
            ADMISSION ID
          </TableHead>
          <TableHead className="text-[#525252] text-lg font-extralight">
            CONDITION
          </TableHead>
          <TableHead className="text-[#525252] text-lg font-extralight">
            DATE
          </TableHead>
          <TableHead className="text-[#525252] text-lg font-extralight">
            STATUS
          </TableHead>
          <TableHead className="text-[#525252] text-lg font-extralight">
            PRESCRIPTION DATE
          </TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((item, index) => (
          <TableRow key={index} className="border-[#DCDCDC]">
            <TableCell>
              <span>
                {item.patientId}
              </span>
            </TableCell>
            <TableCell className="font-bold text-[#525252]">
              {item.condition}
            </TableCell>
           <TableCell className="text-[#525252]">
  {new Date(item.dateAdmitted).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })}
</TableCell>


            <TableCell>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${item.status === "Completed"
                    ? "bg-[#D2E6EE] text-[#39614B]"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {item.status === "Completed" ? "Completed" : "Not Complete"}
              </span>
            </TableCell>
            <TableCell className="text-[#525252]">
              {item.prescriptionDate}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MedicalTable