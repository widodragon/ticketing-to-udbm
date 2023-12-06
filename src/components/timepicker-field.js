import React, { useState } from "react"
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import EventIcon from '@mui/icons-material/Event';
import 'moment/locale/id';

const TimePickerField = ({
    label,
    placeholder,
    errorMessage = "Merchant wajib diisi",
    isError = false,
    ...other
}) => {
    const [open, setOpen] = useState(false)
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
            <Typography color={"rgb(71 85 105)"} fontSize="0.875rem" fontWeight={"600"} height={25}>{label}</Typography>
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="de">
                <MobileTimePicker
                    slots={{
                        openPickerIcon: () => {
                            return null;
                        }
                    }}
                    slotProps={{
                        textField: {
                            variant: "standard",
                            onClick: () => setOpen(true),
                            placeholder: placeholder
                        },
                    }}
                    open={open}
                    onClose={() => setOpen(false)}
                    {...other}
                />
            </LocalizationProvider>
            <Typography fontSize={12} color="red">{isError && errorMessage}</Typography>
        </Box>
    )
}

export default TimePickerField;