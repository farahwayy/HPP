import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import PrescriptionModal from "./PrescripModal";
import axios from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";
import useDecodedToken from "@/utils/DecodeToken";
import { jwtDecode } from "jwt-decode";

const PrescripTable = ({ sortOrder }) => {
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescription, setPrescription] = useState([])
  const [loading, setLoading] = useState(false);



  useEffect(() => {
  const getData = async () => {
        setLoading(true)

      const patient = jwtDecode(localStorage.getItem('token'))


      try{
        const data = await axios.get('http://localhost:7000/prescription',{
          params: {
            email:patient.email
          }
        });

        setPrescription(data.data.data)

      }catch(err){
        console.log(err, 'Error fetching prescription data')
        setLoading(false)
      }finally{
        setLoading(false)
      }
    }
        console.log('HELOOOO')
    getData()

  },[])

 
  console.log(prescription)
const filteredPrescription = prescription.map(
  ({ doctorInformation, dateOfPrescription, name, age, gender, inscription }) => ({
    doctor: doctorInformation,          
    date: dateOfPrescription,           
    name,                                
    age,                                  
    gender,                              
    meds: inscription                    
  })
);

const data = filteredPrescription;

console.log(data);

  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  if(loading == true){
    return <><h1>Loading....</h1></>
  }

  if(prescription.length === 0){
    return <><h1>No prescription to show</h1></>
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[#525252] text-xl font-extralight">
              DOCTOR
            </TableHead>
            <TableHead className="text-[#525252] text-xl font-extralight">
              DATE
            </TableHead>
            <TableHead className="text-right text-[#525252] text-xl font-extralight pr-12">
              ACTION
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold text-[#525252]">
                {item.doctor}
              </TableCell>
              <TableCell className="text-[#525252]">{item.date}</TableCell>
              <TableCell
                className="text-right pr-10 text-[#005F92] font-medium cursor-pointer"
                onClick={() => setSelectedPrescription(item)}
              >
                View Details
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for prescription details */}
      <PrescriptionModal
        isOpen={!!selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
        prescription={selectedPrescription}
      />
    </>
  );
};

export default PrescripTable;
