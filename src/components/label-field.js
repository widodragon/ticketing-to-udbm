import { Box, Typography } from "@mui/material";
import React from "react";

const LabelField = ({
    label = "",
    value = ""
}) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
            <Typography color={"rgb(71 85 105)"} fontSize="0.875rem" fontWeight={"600"} height={25}>{label}</Typography>
            <Typography fontSize={12} color="black">{value}</Typography>
        </Box>
    )
}

export default LabelField;