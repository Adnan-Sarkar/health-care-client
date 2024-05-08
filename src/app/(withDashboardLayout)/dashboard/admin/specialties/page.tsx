"use client";

import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import SpecialistModal from "./components/SpecialistModal";
import React from "react";
import {
  useDeleteSpecialityMutation,
  useGetAllSpecialtiesQuery,
} from "@/redux/api/specialtiesApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const { data, isLoading } = useGetAllSpecialtiesQuery("");
  const [deleteSpeciality] = useDeleteSpecialityMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSpeciality(id).unwrap();
      if (res?.id) {
        toast.success("Speciality Deleted Successfully");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 250 },
    {
      field: "icon",
      headerName: "Icon",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image src={row.icon} alt={row.title} width={30} height={30} />
          </Box>
        );
      },
    },
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
  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button onClick={() => setIsModalOpen(true)}>Create Spetiality</Button>
        <SpecialistModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField size={"small"} placeholder="Search specialist" />
      </Stack>
      <Box my={2}>
        <DataGrid
          loading={isLoading}
          rows={isLoading ? [] : data}
          columns={columns}
          checkboxSelection
          hideFooter={true}
        />
      </Box>
    </Box>
  );
};

export default SpecialtiesPage;
