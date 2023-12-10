import React from "react";
import { ReactSVG } from "react-svg";
import { Box } from "@mui/material";

const CustomIcon = ({
    disabled = false,
    color = "white",
    size = "30px",
    src = "./images/UDB_Icon_Cash Bank.svg",
    style = {},
    rotate = 0,
}) => {
    return (
        <Box sx={{
            color: "white"
        }}>
            <img
                src={src}
                style={{
                    width: size,
                    height: size,
                    color: color,
                    transform: `rotate(${rotate}deg)`,
                    ...style
                }}
            />
        </Box>
    );
};

export default CustomIcon;
