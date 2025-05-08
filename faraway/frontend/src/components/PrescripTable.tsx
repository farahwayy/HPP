import React from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table" // adjust import path to match your project

const PrescripTable = () => {
  const data = [
    { doctor: "Dra. Toni Fowler", date: "May 6, 2025" },
    { doctor: "Dra. Toni Fowler", date: "May 4, 2025" },
    { doctor: "Dra. Toni Fowler", date: "April 9, 2025" },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-[#525252] text-xl font-extralight">DOCTOR</TableHead>
          <TableHead className="text-[#525252] text-xl font-extralight">DATE</TableHead>
          <TableHead className="text-right text-[#525252] text-xl font-extralight pr-12">ACTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-bold text-[#525252]">{item.doctor}</TableCell>
            <TableCell className="text-[#525252]">{item.date}</TableCell>
            <TableCell className="text-right pr-10 text-[#005F92] font-medium cursor-pointer">
              View Details
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PrescripTable
