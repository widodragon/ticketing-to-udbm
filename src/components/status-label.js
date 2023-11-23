import { Box } from "@mui/material";
import React from "react";

const StatusLabel = ({
    icon,
    label = "",
    variant = "active"
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                px: 2,
                py: 1,
                opacity: 0.9,
                width: "max-content",
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
                gap: 1
            }}
        >
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: variant === "active" ? "green" : "red",
                width: "1.8rem",
                height: "1.8rem",
                borderRadius: "0.9rem"
            }}>
                {icon}
            </Box>
            <div>{label}</div>
        </Box>
    )
}

export default StatusLabel;