import React from "react"
import { Autocomplete, Box, TextField, Typography } from "@mui/material";

const SelectField = ({
    label,
    placeholder,
    data,
    setValue,
    required = false,
    selectedValue,
    errorMessage = "Merchant wajib diisi",
    isError = false,
    ...other
}) => {
    const handleChange = (_event, values) => {
        setValue(values);
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
            <Typography color={"rgb(71 85 105)"} fontSize="0.875rem" fontWeight={"600"} height={25}>{label} <span style={{ color: 'red' }}>{`${required ? "*" : ""}`}</span></Typography>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={data}
                value={selectedValue}
                onChange={handleChange}
                renderInput={(params) => <TextField variant="standard" {...params} placeholder={placeholder} />}
                {...other}
            />
            <Typography fontSize={12} color="red">{isError && errorMessage}</Typography>
        </Box>
    )
}
export default SelectField;