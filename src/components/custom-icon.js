import React from "react";
import { ReactSVG } from "react-svg";
import { Box } from "@mui/material";

const CustomIcon = ({
    disabled = false,
    color = "white",
    size = "30px",
    icon = "",
    style = "",
    rotate = 0,
}) => {
    return (
        <Box sx={{
            color: "white"
        }}>
            <img
                src="/images/UDB_Icon_Cash Bank.svg"
                style={{
                    width: size,
                    height: size,
                    color: color
                }}
            />
            {/* <ReactSVG
                src={icon}
                style={{}}
                beforeInjection={(svg) => {
                    svg.setAttribute(
                        "style",
                        `width: ${size}; height: ${size}; fill: ${color}; ${style} transform: rotate(${rotate}deg);`
                    );
                }}
            /> */}
        </Box>
    );
};

export default CustomIcon;
