import React from "react";
import { Alert, AlertTitle, Box, Typography } from "@mui/material";

const FilterMessageNote = ({
  width = "100%",
  sx = {},
  backgroundColor = "#F2F5F9",
  color = "#64748B",
  borderRadius = 3,
  severity = "info",
  paddingY = 1,
  title = "To Display Specific Transactions, Use the Filters Above.",
  subtitle = [],
}) => {
  return (
    <Box sx={{
      width: "50%",
      ...sx
    }}>
      <Alert
        sx={{
          width: width,
          paddingY: paddingY,
          backgroundColor: backgroundColor,
          color: color,
          borderRadius: borderRadius,
        }}
        severity={severity}
      >
        <Typography py={0} fontWeight="bold">{title}</Typography>
        {subtitle.map((item, index) => (
          <li
            key={index}
            style={{
              marginLeft: "4px",
              fontSize: "14px",
              paddingTop: 0,
              paddingBottom: 0
            }}
          >
            {item}
          </li>
        ))}
      </Alert>
    </Box>
  );
};

export default FilterMessageNote;
