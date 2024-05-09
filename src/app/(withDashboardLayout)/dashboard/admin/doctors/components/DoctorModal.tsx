import CustomForm from "@/components/Forms/CustomForm";
import CustomInputField from "@/components/Forms/CustomInputField";
import CustomSelectField from "@/components/Forms/CustomSelectField";
import CustomFullScreenModal from "@/components/shared/Modal/CustomFullScreenModal";
import { Gender } from "@/constants/gender";
import { useCreateDoctorMutation } from "@/redux/api/doctorApi";
import { modifyPayload } from "@/utils/modifypayload";
import { Box, Button, Grid, Stack } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorModal = ({ open, setOpen }: TProps) => {
  const [createNewDocotr] = useCreateDoctorMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    values.doctor.experience = Number(values.doctor.experience);
    values.doctor.apointmentFee = Number(values.doctor.apointmentFee);
    const data = modifyPayload(values);
    try {
      const res = await createNewDocotr(data).unwrap();

      if (res?.id) {
        toast.success("Doctor Created Successfully");
        setOpen(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message);
    }
  };

  const defaultValues = {
    doctor: {
      email: "",
      name: "",
      contactNumber: "",
      address: "",
      registrationNumber: "",
      gender: "",
      experience: 0,
      apointmentFee: 0,
      qualification: "",
      currentWorkingPlace: "",
      designation: "",
      profilePhoto: "",
    },
    password: "",
  };

  return (
    <CustomFullScreenModal
      open={open}
      setOpen={setOpen}
      title="Create New Doctor"
    >
      <CustomForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <CustomInputField
              name="doctor.name"
              label="Name"
              fullWidth={true}
              sx={{ mb: 2 }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CustomInputField
              name="doctor.email"
              type="email"
              label="Email"
              fullWidth={true}
              sx={{ mb: 2 }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <CustomInputField
              name="password"
              type="password"
              label="Password"
              fullWidth={true}
              sx={{ mb: 2 }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <CustomInputField
              name="doctor.contactNumber"
              label="Contract Number"
              fullWidth={true}
              sx={{ mb: 2 }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CustomInputField
              name="doctor.address"
              label="Address"
              fullWidth={true}
              sx={{ mb: 2 }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CustomInputField
              name="doctor.registrationNumber"
              label="Registration Number"
              fullWidth={true}
              sx={{ mb: 2 }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CustomInputField
              name="doctor.experience"
              type="number"
              label="Experience"
              fullWidth={true}
              sx={{ mb: 2 }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CustomSelectField
              items={Gender}
              name="doctor.gender"
              label="Gender"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CustomInputField
              name="doctor.apointmentFee"
              type="number"
              label="ApointmentFee"
              fullWidth={true}
              sx={{ mb: 2 }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CustomInputField
              name="doctor.qualification"
              label="Qualification"
              fullWidth={true}
              sx={{ mb: 2 }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <CustomInputField
              name="doctor.currentWorkingPlace"
              label="Current Working Place"
              fullWidth={true}
              sx={{ mb: 2 }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CustomInputField
              name="doctor.designation"
              label="Designation"
              fullWidth={true}
              sx={{ mb: 2 }}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box>
            <Button type="submit">Create New Docotr</Button>
          </Box>
        </Stack>
      </CustomForm>
    </CustomFullScreenModal>
  );
};

export default DoctorModal;
