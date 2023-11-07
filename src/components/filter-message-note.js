import React from "react";
import { Alert, AlertTitle } from "@mui/material";

const FilterMessageNote = ({
  width = "100%",
  className = " w-1/2",
  backgroundColor = "#F2F5F9",
  color = "#64748B",
  borderRadius = 3,
  severity = "info",
  paddingY = 1,
  title = "To Display Specific Transactions, Use the Filters Above.",
  subtitle = [],
}) => {
  return (
    <div className={className}>
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
        <span className=" py-0 font-bold">{title}</span>
        {subtitle.map((item, index) => (
          <li key={index} className=" ml-1 text-md py-0">
            {item}
          </li>
        ))}
      </Alert>
    </div>
  );
};

export default FilterMessageNote;
