"use client";

import React from "react";
import CustomModal from "@/components/shared/Modal/CustomModal";
import CustomForm from "@/components/Forms/CustomForm";
import { FieldValues } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import CustomInputField from "@/components/Forms/CustomInputField";
import CustomFileUploader from "@/components/Forms/CustomFileUploader";
import { modifyPayload } from "@/utils/modifypayload";
import { useCreateSpecialityMutation } from "@/redux/api/specialtiesApi";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialistModal = ({ open, setOpen }: TProps) => {
  const [createSpeciality] = useCreateSpecialityMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);

    try {
      const res = await createSpeciality(data).unwrap();
      if (res?.id) {
        toast.success("Speciality Created Successfully");
        setOpen(false);
      }
    } catch (error: any) {
      console.log(error.mesage);
    }
  };
  return (
    <CustomModal title="Create A New Speciality" open={open} setOpen={setOpen}>
      <CustomForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <CustomInputField
              name="title"
              label="Title"
              variant={"outlined"}
              fullWidth
            />
          </Grid>
          <Grid item md={12}>
            <CustomFileUploader
              name="file"
              label="Upload Icon"
              fullWidth={true}
            />
          </Grid>
        </Grid>
        <Button sx={{ mt: 2 }} type="submit">
          Create Speciality
        </Button>
      </CustomForm>
    </CustomModal>
  );
};

export default SpecialistModal;
