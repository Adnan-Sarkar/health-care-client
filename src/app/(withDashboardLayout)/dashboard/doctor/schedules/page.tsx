"use client"

import React, {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import DoctorScheduleModal from "@/app/(withDashboardLayout)/dashboard/doctor/schedules/components/DoctorScheduleModal";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {TDoctorSchedule} from "@/types/index.types";
import dayjs from "dayjs";
import {useGetAllDoctorSchedulesQuery} from "@/redux/api/doctorScheduleApi";
import {dateFormatter} from "@/utils/dateFormatter";


const DoctorSchedulePage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [allSchedules, setAllSchedules] = useState<any>([]);
    const {data, isLoading} = useGetAllDoctorSchedulesQuery({});
    const schedules = data?.doctorSchedules;
    const meta = data?.meta;

    useEffect(() => {
        const updatedSchedules = schedules?.map((schedule: TDoctorSchedule) => {
            return {
                id: schedule.scheduleId,
                doctorId: schedule.doctorId,
                startDate: dateFormatter(schedule.schedule.startDate),
                startTime: dayjs(schedule.schedule.startDate).format("hh:mm a"),
                endTime: dayjs(schedule.schedule.endDate).format("hh:mm a")
            }
        })

        setAllSchedules(updatedSchedules);
    }, [schedules]);

    const columns: GridColDef[] = [
        {field: "startDate", headerName: "Date", flex: 1},
        {field: "startTime", headerName: "Start Time", flex: 1},
        {field: "endTime", headerName: "End Time", flex: 1},
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({row}) => {
                return (
                    <Box>
                        Demo Action
                    </Box>
                );
            },
        },
    ];

    return (
        <Box>
            <Button onClick={() => setIsModalOpen(true)}>Add Schedules</Button>
            <DoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen}/>
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

export default DoctorSchedulePage;