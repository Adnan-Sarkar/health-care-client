"use client";

import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import DoctorModal from "./components/DoctorModal";
import React, { useState } from "react";
import {
  useDeleteDoctorMutation,
  useGetAllDoctorsQuery,
} from "@/redux/api/doctorApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDebounced } from "@/redux/hooks";
import { toast } from "sonner";

const DoctorsPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedTermn = useDebounced({ searchQuery: searchTerm, delay: 700 });

  if (debouncedTermn) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllDoctorsQuery({ ...query });
  const [deleteDoctor] = useDeleteDoctorMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDoctor(id).unwrap();
      if (res?.id) {
        toast.success("Doctor Deleted Successfully");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "apointmentFee", headerName: "Appointment Fee", flex: 1 },
    {
      field: "currentWorkingPlace",
      headerName: "Current Working Place",
      flex: 1,
    },
    { field: "qualification", headerName: "Qualification", flex: 1 },
    { field: "experience", headerName: "Experience", flex: 1 },
    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "registrationNumber", headerName: "Registration Number", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const doctors = data?.doctors;
  const meta = data?.meta;

  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button onClick={() => setIsModalOpen(true)}>Create New Doctor</Button>
        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          size="small"
          placeholder="search doctors"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Stack>
      <Box my={2}>
        <DataGrid
          loading={isLoading}
          rows={isLoading ? [] : doctors}
          columns={columns}
          checkboxSelection
          hideFooter={true}
        />
      </Box>
    </Box>
  );
};

export default DoctorsPage;
