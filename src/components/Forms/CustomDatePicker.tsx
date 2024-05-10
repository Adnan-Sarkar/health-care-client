import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type CustomDatePickerProps = {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
};

const CustomDatePicker = ({
  name,
  size,
  label,
  required,
  fullWidth = true,
  sx,
}: CustomDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { onChange, value, ...field } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
          label={label}
            timezone="system"
            disablePast={true}
            {...field}
            value={value || Date.now()}
            onChange={(date) => onChange(date)}
            slotProps={{
              textField: {
                required: required,
                size: size,
                sx: {
                  ...sx
                },
                 variant: "outlined",
                 fullWidth: fullWidth
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default CustomDatePicker;
