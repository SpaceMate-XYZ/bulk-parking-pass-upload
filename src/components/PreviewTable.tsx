import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface RowData {
  id: string;
  licensePlate: string;
  ownerName: string;
  validFrom: string;
  validTo: string;
  status: "valid" | "invalid" | "pending";
  errorMessage?: string;
}

interface PreviewTableProps {
  data?: RowData[];
}

const defaultData: RowData[] = [
  {
    id: "1",
    licensePlate: "ABC123",
    ownerName: "John Doe",
    validFrom: "2024-01-01",
    validTo: "2024-12-31",
    status: "valid",
  },
  {
    id: "2",
    licensePlate: "XYZ789",
    ownerName: "Jane Smith",
    validFrom: "2024-02-01",
    validTo: "2024-12-31",
    status: "invalid",
    errorMessage: "Invalid date format",
  },
  {
    id: "3",
    licensePlate: "DEF456",
    ownerName: "Bob Johnson",
    validFrom: "2024-03-01",
    validTo: "2024-12-31",
    status: "pending",
  },
];

const PreviewTable = ({ data = defaultData }: PreviewTableProps) => {
  const getStatusBadge = (status: RowData["status"]) => {
    const variants = {
      valid: "bg-green-100 text-green-800",
      invalid: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="w-full bg-white border rounded-lg shadow-sm">
      <ScrollArea className="h-[400px] w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>License Plate</TableHead>
              <TableHead>Owner Name</TableHead>
              <TableHead>Valid From</TableHead>
              <TableHead>Valid To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Error Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.licensePlate}</TableCell>
                <TableCell>{row.ownerName}</TableCell>
                <TableCell>{row.validFrom}</TableCell>
                <TableCell>{row.validTo}</TableCell>
                <TableCell>{getStatusBadge(row.status)}</TableCell>
                <TableCell>{row.errorMessage || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default PreviewTable;
