import React from "react"
import { Box, Input, Typography } from "@mui/material";

const InputField = ({
    label,
    required = false,
    errorMessage = "Merchant wajib diisi",
    isError = false,
    ...other
}) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
            <Typography color={"rgb(71 85 105)"} fontSize="0.875rem" fontWeight={"600"} height={25}>{label} <span style={{ color: 'red' }}>{`${required ? "*" : ""}`}</span></Typography>
            <Input
                {...other}
            />
            <Typography fontSize={12} color="red">{isError && errorMessage}</Typography>
        </Box>
    )
}

export default InputField;