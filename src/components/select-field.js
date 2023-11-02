import React from "react"
import { Autocomplete, Box, TextField, Typography } from "@mui/material";

const SelectField = ({
    label,
    placeholder,
    data,
    setValue,
    selectedValue,
    ...other
}) => {
    const handleChange = (_event, values) => {
        setValue(values);
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
            <Typography color={"gray"} fontWeight={"600"} height={25}>{label}</Typography>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={data}
                value={selectedValue}
                onChange={handleChange}
                renderInput={(params) => <TextField variant="standard" {...params} placeholder={placeholder} />}
                {...other}
            />
        </Box>
    )
}
export default SelectField;