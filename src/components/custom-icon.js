import React from "react";
import { ReactSVG } from "react-svg";
import { Box } from "@mui/material";
import BaseIcon from "../assets/UDB_Icon_Home_Blue.svg";

const CustomIcon = ({
    disabled = false,
    color = "white",
    size = "30px",
    icon = BaseIcon,
    style = "",
    rotate = 0,
}) => {
    return (
        <Box sx={{
            color: "white"
        }}>
            <ReactSVG
                src={icon}
                style={{}}
                beforeInjection={(svg) => {
                    svg.setAttribute(
                        "style",
                        `width: ${size}; height: ${size}; fill: ${color}; ${style} transform: rotate(${rotate}deg);`
                    );
                }}
            />
        </Box>
    );
};

export default CustomIcon;
