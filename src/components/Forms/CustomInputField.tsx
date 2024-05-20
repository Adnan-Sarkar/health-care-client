import {SxProps, TextField} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";

type CustomInputFieldProps = {
    name: string;
    label: string;
    type?: string;
    size?: "small" | "medium";
    fullWidth?: boolean;
    variant?: "outlined" | "filled" | "standard";
    placeholder?: string;
    required?: boolean;
    sx?: SxProps;
};

const CustomInputField = ({
                              name,
                              label,
                              type,
                              size = "small",
                              fullWidth = false,
                              variant = "outlined",
                              placeholder,
                              required,
                              sx,
                          }: CustomInputFieldProps) => {
    const {control} = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({field, fieldState: {error}}) => {
                return (
                    <TextField
                        variant={variant}
                        label={label}
                        type={type}
                        size={size}
                        fullWidth={fullWidth}
                        placeholder={placeholder}
                        required={required}
                        {...field}
                        sx={{...sx}}
                        error={!!error?.message}
                        helperText={error?.message}
                    />
                );
            }}
        />
    );
};

export default CustomInputField;
