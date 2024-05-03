import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type CustomInputFieldProps = {
  name: string;
  label: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  variant: "outlined" | "filled" | "standard";
};

const CustomInputField = ({
  name,
  label,
  type,
  size = "small",
  fullWidth = false,
  variant,
}: CustomInputFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <TextField
            variant={variant}
            label={label}
            type={type}
            size={size}
            fullWidth={fullWidth}
            {...field}
          />
        );
      }}
    />
  );
};

export default CustomInputField;
