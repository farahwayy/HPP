import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import PrescriptionModal from "./PrescripModal";

const PrescripTable = ({ sortOrder }) => {
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const data = [
    {
      doctor: "Dra. Toni Fowler",
      date: "May 6, 2025",
      name: "Mark Doe",
      age: 44,
      sex: "M",
      meds: [
        { name: "Paracetamol", dosage: "500mg", frequency: "0x/Day", qty: 0 },
        { name: "Neozep", dosage: "500mg", frequency: "0x/Day", qty: 0 },
      ],
    },
    {
      doctor: "Dr. Patrick",
      date: "May 4, 2025",
      name: "Jane Smith",
      age: 31,
      sex: "F",
      meds: [
        { name: "Ibuprofen", dosage: "200mg", frequency: "2x/Day", qty: 10 },
      ],
    },
    {
      doctor: "Dr. Isaiah",
      date: "April 9, 2025",
      name: "John Appleseed",
      age: 29,
      sex: "M",
      meds: [
        { name: "Vitamin C", dosage: "1000mg", frequency: "1x/Day", qty: 30 },
      ],
    },
  ];

  // Sort prescriptions by date based on sortOrder
  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

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
