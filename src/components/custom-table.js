import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledTableContainer = styled(TableContainer)`
  box-shadow: none;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
  border: 0px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`;

const StyledTableHeadRow = styled(TableRow)`
  background-color: #ffffff;
`;

const StyledTableCell = styled(TableCell)`
  padding: 8px 24px;
  font-weight: bold;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.87);
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: #f3f3f3;
  }
`;

const StyledTableCellData = styled(TableCell)`
  padding: 6px 24px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.87);
`;

const StyledTableCellHeader = styled(TableCell)`
  padding: 6px 24px;
  font-size: 14px;
  width: 500px;
`;

const StyledTableBody = styled(TableBody)`
  padding: 6px 24px;
  height: 50px;
`;

const baseRenderCell = (item, header) => {
  return <span>{item[header.value]}</span>;
};

const CustomTable = ({
  headers,
  items,
  bodyHeight = "30px",
  renderCell = baseRenderCell,
  checkBox = false,
  onItemCheck,
  onAllCheck,
  groupHead = false,
  group,
  keyName,
}) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleItemCheck = (item) => {
    const updatedCheckedItems = checkedItems.includes(item)
      ? checkedItems.filter((checkedItem) => checkedItem !== item)
      : [...checkedItems, item];
    setCheckedItems(updatedCheckedItems);
    if (onItemCheck) {
      onItemCheck(updatedCheckedItems);
    }
  };

  const handleAllCheck = () => {
    const updatedCheckedItems =
      checkedItems.length === items.length ? [] : [...items];
    setCheckedItems(updatedCheckedItems);
    if (onAllCheck) {
      onAllCheck(updatedCheckedItems);
    }
  };
  const title = "";

  return (
    <StyledTableContainer component={Paper}>
      <StyledTable>
        {groupHead ? (
          <TableHead>
            <StyledTableHeadRow>
              {group.map((group) => (
                <StyledTableCellHeader
                  sx={{
                    fontWeight: "bold",
                  }}
                  align="center"
                  colSpan={group.colSpan}
                  style={{
                    borderRight: group.rightBorder ? "1px solid #ccc" : "",
                  }}
                  key={group.title}
                >
                  <span className="-ml-1">{group.title.toUpperCase()}</span>
                  {/* <span>Current</span> */}
                </StyledTableCellHeader>
              ))}
            </StyledTableHeadRow>
          </TableHead>
        ) : (
          ""
        )}
        <TableHead>
          <StyledTableHeadRow>
            {checkBox ? (
              <StyledTableCellHeader>
                <Checkbox
                  checked={
                    checkedItems.length === items.length && items.length !== 0
                  }
                  onClick={handleAllCheck}
                />
              </StyledTableCellHeader>
            ) : (
              ""
            )}
            {headers.map(
              (header) =>
                !header.hidden && (
                  <StyledTableCellHeader
                    sx={{
                      minWidth: header.width,
                      fontWeight: "bold",
                      height: bodyHeight,
                    }}
                    align={header.align}
                    key={header.value}
                    style={{
                      borderRight: header.rightBorder ? "1px solid #ccc" : "",
                    }}
                  >
                    <span className="-ml-1">{header.title.toUpperCase()}</span>
                  </StyledTableCellHeader>
                )
            )}
          </StyledTableHeadRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <StyledTableRow
              style={{ height: bodyHeight }}
              key={keyName ? item[keyName] : item.id}
            >
              {checkBox ? (
                <StyledTableCellData>
                  <Checkbox
                    checked={checkedItems.includes(item)}
                    onClick={() => handleItemCheck(item)}
                  />
                </StyledTableCellData>
              ) : (
                ""
              )}
              {headers.map(
                (header) =>
                  !header.hidden && (
                    <StyledTableCellData
                      sx={{}}
                      align={header.align}
                      key={header.value}
                      style={{
                        borderRight: header.rightBorder ? "1px solid #ccc" : "",
                      }}
                    >
                      {renderCell(item, header, index)}
                    </StyledTableCellData>
                  )
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default CustomTable;
