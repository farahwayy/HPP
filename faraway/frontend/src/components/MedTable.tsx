import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const MedicalTable = ({ sortOrder, typeFilter, onViewDetails }) => {

  const PatientData = [
    {
      type: "Lab Results",
      title: "Blood Work Panel",
      date: "May 6, 2025",
      status: "Completed",
    },
    {
      type: "Imaging",
      title: "Chest X-Ray",
      date: "Feb 1, 2025",
      status: "Completed",
    },
    {
      type: "Visit Notes",
      title: "Annual Physical",
      date: "Jan 20, 2025",
      status: "Completed",
    },
    {
      type: "Vaccination",
      title: "Flu Vaccine",
      date: "",
      status: "Completed",
    },
    {
      type: "Lab Results",
      title: "Diabetes Test",
      date: "",
      status: "Completed",
    },
    {
      type: "Specialist",
      title: "OB-GYN Consultation",
      date: "",
      status: "Completed",
    },
    {
      type: "Visit Notes",
      title: "Follow-up Appointment",
      date: "",
      status: "Completed",
    },
    {
      type: "Lab Results",
      title: "Allergy Test",
      date: "",
      status: "Not Complete",
    },
  ];

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


  return (
    <Table className="border border-[#DCDCDC]">
      <TableHeader className="border-b border-[#DCDCDC]">
        <TableRow className="bg-[#F6F6F6]">
          <TableHead className="text-[#525252] py-5 text-lg font-extralight">
            TYPE
          </TableHead>
          <TableHead className="text-[#525252] text-lg font-extralight">
            TITLE
          </TableHead>
          <TableHead className="text-[#525252] text-lg font-extralight">
            DATE
          </TableHead>
          <TableHead className="text-[#525252] text-lg font-extralight">
            STATUS
          </TableHead>
          <TableHead className="text-[#525252] text-lg font-extralight pr-12">
            ACTION
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((item, index) => (
          <TableRow key={index} className="border-[#DCDCDC]">
            <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                    item.type === "Lab Results"
                      ? "bg-[#D2E6EE] text-[#0077B6]"
                      : item.type === "Imaging"
                      ? "bg-[#E6DAD5] text-[#9B5134]"
                      : item.type === "Visit Notes"
                      ? "bg-[#F1F5BD] text-[#48482B]"
                      : item.type === "Specialist"
                      ? "bg-[#FBD4E0] text-[#FF1B60]"
                      : item.type === "Vaccination"
                      ? "bg-[#E5CAE7] text-[#3B3A1D]"
                      : ""
                  }`}
                >
                  {item.type}
                </span>
            </TableCell>
            <TableCell className="font-bold text-[#525252]">
              {item.title}
            </TableCell>
            <TableCell className="text-[#525252]">
              {item.date}
            </TableCell>
            <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                    item.status === "Completed"
                      ? "bg-[#D2E6EE] text-[#39614B]"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status === "Completed" ? "Completed" : "Not Complete"}
                </span>
            </TableCell>
            <TableCell
              className=" pr-10 text-[#005F92] font-medium cursor-pointer"
              onClick={() => onViewDetails(item)}
            >
              View Details
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MedicalTable