import React, { useEffect, useState } from "react"
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material"
import SelectField from "../components/select-field"
import DatePickerField from "../components/datepicker-field"
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { merchant_data } from "../data/merchant";
import CustomPagination from "../components/custom-pagination";
import CustomTable from "../components/custom-table";
import { getInvoiceList, getInvoiceMetadata } from "../services/invoice";
import { thousandSeparator } from "../utils/thousand-separator";

const LaporanInvoice = ({
    label = "Laporan Invoice",
    merchantData = merchant_data
}) => {
    const [merchantOption, setMerchantOption] = useState([])
    const [ouCode, setOuCode] = useState("")
    const [limit, setLimit] = useState(25);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(-99);
    const [countLoading, setCountLoading] = useState(false);
    const [disableNext, setDisableNext] = useState(false);
    const [data, setData] = useState([]);
    const [periode, setPeriode] = useState(null)
    const header = [
        {
            title: "CORPORATE NAME",
            value: "corporateName",
            align: "left",
            width: "200px",
        },
        {
            title: "STORE FEE",
            value: "amountPerCount",
            align: "left",
            width: "250px",
        },
        {
            title: "STORE QUANTITY",
            value: "count",
            align: "left",
            width: "200px",
        },
        {
            title: "TOTAL INVOICE FEE",
            value: "amount",
            align: "left",
            width: "200px",
        }
    ]
    const renderCell = (item, header) => {
        if (header.value === "corporateName") {
            return <span>{item.corporateName}</span>;
        } else if (header.value === "amountPerCount") {
            return <span>{thousandSeparator(item.amountPerCount)}</span>;
        } else if (header.value === "count") {
            return <span>{thousandSeparator(item.count)}</span>;
        } else if (header.value === "amount") {
            return <span>{thousandSeparator(item.amount)}</span>;
        }

        return <span>{item[header.value] ? item[header.value] : "-"}</span>;
    };
    useEffect(() => {
        let merchantArr = [];
        merchantData.map((item) => {
            merchantArr.push({
                ...item,
                label: item.ouName,
                value: item.ouCode
            })
        })
        setMerchantOption(merchantArr);
    }, [merchantData]);
    const handleGetListGrading = ({
        limitDt,
        offsetDt
    }) => {
        let ouCodeValue = ouCode.value || ""
        let countResult = 0;
        let data = {
            "periode": periode.format("YYYYMM"),
            "outletCode": [
                ouCodeValue
            ],
            "limit": limitDt,
            "offset": offsetDt
        }
        setCountLoading(true)
        getInvoiceMetadata({
            "periode": "",
            "outletCode": [
                ouCodeValue
            ]
        }).then((res) => {
            countResult = res.result;
            setDisableNext(false);
            setCountLoading(false);
            setCount(countResult)
        }).catch((e) => {
            setCount(-99);
            setCountLoading(false);
            setCount(countResult)
        })
        getInvoiceList(data).then((res) => {
            if (res.result) {
                setData(res.result)
            } else {
                setDisableNext(true);
                setData([]);
            }
        }).catch((e) => {
            setData([]);
            setDisableNext(true);
            console.log(e)
        })
    }
    const pageChange = async (value) => {
        var ofset = value * limit;
        setOffset(ofset);
        handleGetListGrading({ limitDt: limit, offsetDt: offset });
    };

    const rowsChange = async (e) => {
        setOffset(0);
        setLimit(e.props.value);
        handleGetListGrading({ limitDt: e.props.value, offsetDt: 0 });
    };
    return (
        <Stack direction={"column"} p={"2rem"}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent sx={{ p: "2rem" }}>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="h4" fontWeight="600">
                            {label}
                        </Typography>
                        <Stack display="flex" direction="column" mt={"2rem"} gap={2}>
                            <Box sx={{
                                display: "grid",
                                gridTemplateColumns: ["repeat(1, 1fr)", "repeat(4, 1fr)"],
                                gap: 2
                            }}>
                                <SelectField
                                    label={"Merchant"}
                                    placeholder="All Merchant"
                                    sx={{ width: "100%", fontSize: "16px" }}
                                    data={merchantOption}
                                    selectedValue={ouCode}
                                    setValue={setOuCode}
                                />
                                <DatePickerField
                                    label={"Periode"}
                                    placeholder="Input Periode"
                                    sx={{ width: "100%", fontSize: "16px" }}
                                    value={periode}
                                    onChange={(newValue) => setPeriode(newValue)}
                                    views={['month', 'year']}
                                />
                            </Box>
                        </Stack>
                        <Stack direction={["column", "row"]} gap={2} alignItems={["end", "inherit"]} justifyContent="space-between" mt={5}>
                            <Box sx={{ py: 2, px: 5, bgcolor: "#f3f5f8", borderRadius: "15px", display: "flex", alignItems: "center", gap: 1 }}>
                                <InfoIcon sx={{ fontSize: "16px", color: "#4e91d0" }} />
                                <Typography variant="p" fontWeight="600" color="#677489">
                                    To Display Specific Transactions, Use the Filters Above.
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
                                {/* <Button sx={{ bgcolor: "green" }} startIcon={<FileOpenIcon />} variant="contained">Export Excel</Button> */}
                                <Button disabled={!ouCode || !periode ? true : false} onClick={() => handleGetListGrading({ limitDt: 25, offsetDt: 0 })} startIcon={<SearchIcon />} variant="contained">Filter</Button>
                            </Box>
                        </Stack>
                        <Box sx={{ width: "100%", mt: 10 }}>
                            <CustomPagination
                                disableNext={disableNext}
                                countLoading={countLoading}
                                limit={limit}
                                offset={offset}
                                count={count}
                                pageChange={(event, v) => pageChange(v)}
                                rowsChange={async (event, e) => rowsChange(e)}
                            />
                            <CustomTable
                                headers={header}
                                items={data}
                                renderCell={renderCell}
                            />
                            <CustomPagination
                                disableNext={disableNext}
                                countLoading={countLoading}
                                limit={limit}
                                offset={offset}
                                count={count}
                                pageChange={(event, v) => pageChange(v)}
                                rowsChange={async (event, e) => rowsChange(e)}
                            />
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Stack>
    )
}

export default LaporanInvoice