import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({
  onClick,
  startIcon,
  name,
  width = "fit",
  height = "fit",
  className,
  variant = "contained",
  color = "primary",
  show = false,
}) => {
  return (
    <div hidden={show} className={className}>
      <Button
        onClick={onClick}
        startIcon={startIcon}
        variant={variant}
        size="medium"
        color={color}
        sx={{
          borderRadius: "5px",
          textTransform: "none",
          width: width,
          height: height,
        }}
      >
        <span style={{ fontSize: "16px" }} className="  ">
          {name}
        </span>
      </Button>
    </div>
  );
};

export default CustomButton;
