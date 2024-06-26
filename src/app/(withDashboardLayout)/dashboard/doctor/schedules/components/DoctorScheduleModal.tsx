import React, {useState} from "react";
import CustomModal from "@/components/shared/Modal/CustomModal";
import dayjs from "dayjs";
import {useGetAllSchedulesQuery} from "@/redux/api/scheduleApi";
import {Stack} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import DoctorMultipleScheduleSelectField
    from "@/app/(withDashboardLayout)/dashboard/doctor/schedules/components/DoctorMultipleScheduleSelectField";
import {LoadingButton} from "@mui/lab";
import {useCreateDoctorScheduleMutation} from "@/redux/api/doctorScheduleApi";
import {toast} from "sonner";


type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorScheduleModal = ({open, setOpen}: TProps) => {
    const [selectedDate, setSelectedDate] = useState(
        dayjs(new Date()).toISOString()
    );

    const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([]);

    const query: Record<string, any> = {};

    if (!!selectedDate) {
        query['startDate'] = dayjs(selectedDate)
            .hour(0)
            .minute(0)
            .millisecond(0)
            .toISOString();
        query['endDate'] = dayjs(selectedDate)
            .hour(23)
            .minute(59)
            .millisecond(999)
            .toISOString();
    }

    const {data} = useGetAllSchedulesQuery(query);
    const [createSchedule, {isLoading}] = useCreateDoctorScheduleMutation();
    const schedules = data?.schedules;

    const handleSubmit = async () => {
        try {
            const res = await createSchedule({scheduleIds: selectedScheduleIds}).unwrap();
            if (res?.count > 0) {
                toast.success("Doctor Schedule Created Successfully");
                setOpen(false);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <CustomModal title={"Add New Schedules"} open={open} setOpen={setOpen}>
            <Stack direction={'column'} gap={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label='Controlled picker'
                        value={dayjs(selectedDate)}
                        onChange={(newValue) =>
                            setSelectedDate(dayjs(newValue).toISOString())
                        }
                        sx={{width: '100%'}}
                    />
                </LocalizationProvider>
                <DoctorMultipleScheduleSelectField schedules={schedules} selectedScheduleIds={selectedScheduleIds}
                                                   setSelectedScheduleIds={setSelectedScheduleIds}/>

                <LoadingButton
                    size="small"
                    onClick={handleSubmit}
                    loading={isLoading}
                    loadingIndicator="Submitting..."
                    variant="contained"
                >
                    <span>Submit</span>
                </LoadingButton>
            </Stack>
        </CustomModal>
    );
};

export default DoctorScheduleModal;