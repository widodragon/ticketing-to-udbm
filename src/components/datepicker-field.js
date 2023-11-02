import React from "react"
import { Box, Typography } from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'moment/locale/id';

const DatePickerField = ({
    label,
    ...other
}) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
            <Typography color={"gray"} fontWeight={"600"} height={25}>{label}</Typography>
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="de">
                <DesktopDatePicker
                    slotProps={{ textField: { variant: "standard" } }}
                    {...other}
                />
            </LocalizationProvider>
        </Box>
    )
}

export default DatePickerField;