"use client"

import React, {useEffect, useState} from "react";
import {Box, Button, Pagination} from "@mui/material";
import DoctorScheduleModal from "@/app/(withDashboardLayout)/dashboard/doctor/schedules/components/DoctorScheduleModal";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {TDoctorSchedule} from "@/types/index.types";
import dayjs from "dayjs";
import {useGetAllDoctorSchedulesQuery} from "@/redux/api/doctorScheduleApi";
import {dateFormatter} from "@/utils/dateFormatter";


const DoctorSchedulePage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [allSchedules, setAllSchedules] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const query: Record<string, any> = {
        page,
        limit
    };

    const {data, isLoading} = useGetAllDoctorSchedulesQuery({...query});
    const schedules = data?.doctorSchedules;
    const meta = data?.meta;

    let pageCount: number = 1;
    if (meta?.total) {
        pageCount = Math.ceil(meta?.total / limit);
    }

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

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

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
                    hideFooterPagination={true}
                    slots={{
                        footer: () => {
                            return <Box
                                sx={
                                    {
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        mb: 2
                                    }
                                }
                            ><Pagination
                                count={pageCount}
                                page={page}
                                onChange={handlePageChange}
                                color={"primary"}/>
                            </Box>
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default DoctorSchedulePage;