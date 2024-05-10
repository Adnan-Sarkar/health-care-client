"use client";

import {Box, Button, IconButton, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import ScheduleModal from "./components/ScheduleModal";
import {useDeleteScheduleMutation, useGetAllSchedulesQuery} from "@/redux/api/scheduleApi";
import {TSchedule, TScheduleFrom} from "@/types/index.types";
import dayjs from "dayjs";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {toast} from "sonner";

const SchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [allSchedules, setAllSchedules] = useState<any>([]);
  const {data, isLoading} = useGetAllSchedulesQuery({});
  const [deleteSchedule] = useDeleteScheduleMutation();
  const schedules = data?.schedules;
  const meta = data?.meta;

    useEffect(() => {
        const updatedSchedules = schedules?.map((schedule: TSchedule) => {
            return {
                id: schedule.id,
                startDate: schedule.startDate,
                endDate: schedule.endDate,
                startTime: dayjs(schedule.startDate).format("hh:mm a"),
                endTime: dayjs(schedule.endDate).format("hh:mm a")
            }
        })

        setAllSchedules(updatedSchedules);
    }, [schedules]);

    const handleDeleteSchedule = async (id: string) => {
        try {
            const res = await deleteSchedule(id).unwrap();
            if (res?.id) {
                toast.success("Schedule Deleted Successfully")
            }
        }
        catch (error: any) {
            toast.error(error?.message);
        }
    }


    const columns: GridColDef[] = [
        { field: "startDate", headerName: "Start Date", flex: 1 },
        { field: "endDate", headerName: "End Date", flex: 1 },
        { field: "startTime", headerName: "Start Time", flex: 1 },
        { field: "endTime", headerName: "End Time", flex: 1 },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return (
                    <Box>
                        <IconButton aria-label="delete" onClick={() => handleDeleteSchedule(row.id)}>
                            <DeleteIcon sx={{ color: "red" }} />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <EditIcon sx={{color: "orange"}} />
                        </IconButton>
                    </Box>
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
        <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
        <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
      </Stack>
      <Box my={2}>
          <DataGrid
              loading={isLoading}
              rows={allSchedules ? allSchedules : []}
              columns={columns}
              checkboxSelection
              hideFooter={true}
          />
      </Box>
    </Box>
  );
};

export default SchedulesPage;
