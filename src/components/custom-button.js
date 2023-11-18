import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({
  onClick,
  startIcon,
  endIcon,
  name,
  width = "fit",
  height = "fit",
  className,
  variant = "contained",
  color = "primary",
  show = false,
  sx = {},
  ...other
}) => {
  return (
    <div hidden={show} className={className}>
      <Button
        onClick={onClick}
        startIcon={startIcon}
        endIcon={endIcon}
        variant={variant}
        size="medium"
        color={color}
        sx={{
          borderRadius: "5px",
          textTransform: "none",
          width: width,
          height: height,
          ...sx
        }}
        {...other}
      >
        <span style={{ fontSize: "16px" }} className="  ">
          {name}
        </span>
      </Button>
    </div>
  );
};

export default CustomButton;
