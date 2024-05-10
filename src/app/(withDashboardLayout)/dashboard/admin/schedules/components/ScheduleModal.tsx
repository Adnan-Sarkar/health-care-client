import CustomDatePicker from "@/components/Forms/CustomDatePicker";
import CustomForm from "@/components/Forms/CustomForm";
import CustomTimePicker from "@/components/Forms/CustomTimePicker";
import CustomModal from "@/components/shared/Modal/CustomModal";
import { dateFormatter } from "@/utils/dateFormatter";
import { Button, Grid, Stack } from "@mui/material";
import { FieldValues } from "react-hook-form";
import React from "react";
import {timeFormatter} from "@/utils/timeFormatter";
import {useCreateScheduleMutation} from "@/redux/api/scheduleApi";
import {toast} from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScheduleModal = ({ open, setOpen }: TProps) => {
  const [createSchedule] = useCreateScheduleMutation();

  const handleSubmit = async (values: FieldValues) => {
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);

    try {
      const res = await createSchedule(values).unwrap();
      console.log(res)
      if (res?.length > 0) {
        toast.success("Schedules Created Successfully");
        setOpen(false);
      }
    }
    catch(error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <CustomModal open={open} setOpen={setOpen} title={"Create Schedule"}>
      <CustomForm onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          justifyContent={"center"}
          sx={{ width: "400px" }}
        >
          <Grid item md={12}>
            <CustomDatePicker name={"startDate"} label={"Start Date"} />
          </Grid>
          <Grid item md={12}>
            <CustomDatePicker name={"endDate"} label={"End Date"} />
          </Grid>
          <Grid item md={6}>
            <CustomTimePicker name={"startTime"} label={"Start Time"} />
          </Grid>
          <Grid item md={6}>
            <CustomTimePicker name={"endTime"} label={"End Time"} />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent={"center"}>
          <Button sx={{ mt: 2 }} type="submit">
            Create Schedule
          </Button>
        </Stack>
      </CustomForm>
    </CustomModal>
  );
};

export default ScheduleModal;
