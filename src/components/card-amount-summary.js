import { Avatar, Skeleton } from "@mui/material";
import React from "react";
import CustomIcon from "./custom-icon";
import { formatCurrency } from "../utils/format-currency";
import { thousandSeparator } from "../utils/thousand-separator";

const CardAmountSummary = ({
  iconBackgroundColor = "#D0DFF4",
  isLoading = false,
  title = "Title:",
  icon = "",
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
    <div
      className={` 
    flex-col col-span-full sm:col-span-6 md:col-span-4  ${sidebarExpanded
          ? "animate-fadeIn  lg:col-span-4"
          : "animate-fadeIn lg:col-span-3"
        }
     ${className}`}
    >
      <header className="flex gap-3 items-center">
        {/* Icon */}
        <div className="  flex items-center ">
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
            <CustomIcon color="#3875CA" size={30} icon={icon} rotate={rotate} />
          </Avatar>
        </div>
        <div className="  ">
          <div className="text-xs font-semibold text-slate-500 uppercase flex ">
            <p>{title}</p>
          </div>
          <div className=" flex items-start">
            <div className="text-lg font-bold text-slate-800 mr-2 flex">
              <p className="text-lg font-bold text-slate-800 mr-2 w-max">
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
              </p>
            </div>
          </div>
          {total !== 0 ? (
            <div className="text-xs font-semibold text-slate-500 uppercase flex ">
              <p className="flex gap-2">
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
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </header>
    </div>
  );
};

export default CardAmountSummary;
