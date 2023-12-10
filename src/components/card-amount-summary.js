import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import React from "react";
import CustomIcon from "./custom-icon";
import { formatCurrency } from "../utils/format-currency";
import { thousandSeparator } from "../utils/thousand-separator";

const CardAmountSummary = ({
  iconBackgroundColor = "#D0DFF4",
  isLoading = false,
  title = "Title:",
  src = "",
  subtitle = "Subtitle:",
  isCurrency = true,
  amount = 0,
  total = 0,
  className = "",
  isTotalCurrency = false,
  sidebarExpanded = false,
  rotate = 0
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gridColumn: sidebarExpanded ? ["1/-1", "span 6 / span 6", "span 4 / span 4"] : ["1/-1", "span 6 / span 6", "span 3 / span 3"]
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center"
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              backgroundColor: iconBackgroundColor,
              color: "white",
              width: 60,
              height: 60,
              borderRadius: 3,
            }}
          >
            <CustomIcon color="#3875CA" size={30} src={src} rotate={rotate} />
          </Avatar>
        </Box>
        <Box>
          <Typography fontSize={"0.75rem"} fontWeight={600} textTransform={"uppercase"} color={"rgb(100, 116, 139)"}>{title}</Typography>
          <Box display="flex" alignItems={"start"}>
            <Typography fontSize={"1.125rem"} fontWeight={600} mr={2} textTransform={"uppercase"} color={"rgb(30, 41, 59)"}>
              <span>
                {!isLoading ? (
                  isCurrency ? (
                    formatCurrency(amount)
                  ) : (
                    thousandSeparator(amount)
                  )
                ) : (
                  <Skeleton width={"120px"} />
                )}
              </span>
            </Typography>
          </Box>
          {total !== 0 ? (
            <Typography fontSize={"0.75rem"} fontWeight={600} textTransform={"uppercase"} color={"rgb(100, 116, 139)"}>
              {subtitle}{" "}
              {!isLoading ? (
                <span>
                  {isTotalCurrency
                    ? thousandSeparator(total)
                    : formatCurrency(total)}
                </span>
              ) : (
                <span>
                  <Skeleton width={"40px"} />
                </span>
              )}
            </Typography>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CardAmountSummary;
