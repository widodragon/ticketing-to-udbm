import { CircularProgress, TablePagination } from "@mui/material";
import React from "react";

const CustomPagination = ({
  countLoading = true,
  limit = 25,
  disableNext = false,
  offset = 0,
  count = -99,
  pageChange,
  rowsChange,
}) => {
  return (
    <TablePagination
      rowsPerPageOptions={[25, 50, 100]}
      page={offset / limit}
      nextIconButtonProps={
        disableNext
          ? {
            disabled: true,
          }
          : undefined
      }
      rowsPerPage={limit}
      count={countLoading || count === -99 ? 100000 : count}
      labelDisplayedRows={({ from, to }) => {
        return (
          <span className=" flex -ml-4 items-center gap-2">
            <span>
              {from}-{to}{" "}
              <span className="" hidden={count === -99}>
                of               &nbsp;
              </span>
            </span>
            <span className="">
              {countLoading ? (
                <CircularProgress sx={{ marginTop: "2px" }} size={15} />
              ) : count === -99 ? (
                ""
              ) : (
                thousandSeparator(count)
              )}
            </span>
          </span>
        );
      }}
      component="div"
      onPageChange={pageChange}
      onRowsPerPageChange={rowsChange}
    />
  );
};

const thousandSeparator = (value) => {
  if (value === "" || value === undefined || value === null) {
    return "";
  } else {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}

export default CustomPagination;
