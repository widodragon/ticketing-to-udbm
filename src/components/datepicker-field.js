import React, { useState } from "react"
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import EventIcon from '@mui/icons-material/Event';
import 'moment/locale/id';

const DatePickerField = ({
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
                <DatePicker
                    slots={{
                        openPickerIcon: () => {
                            return null;
                        }
                    }}
                    slotProps={{
                        textField: {
                            variant: "standard",
                            onClick: () => setOpen(true),
                            placeholder: placeholder,
                            InputProps: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EventIcon />
                                    </InputAdornment>
                                )
                            }
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

export default DatePickerField;