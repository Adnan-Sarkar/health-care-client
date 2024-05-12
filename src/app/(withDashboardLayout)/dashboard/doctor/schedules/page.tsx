"use client"

import {useState} from "react";
import {Box, Button} from "@mui/material";
import DoctorScheduleModal from "@/app/(withDashboardLayout)/dashboard/doctor/schedules/components/DoctorScheduleModal";


const DoctorSchedulePage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    return (
        <Box>
            <Button onClick={() => setIsModalOpen(true)}>Add Schedules</Button>
            <DoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
        </Box>
    );
};

export default DoctorSchedulePage;