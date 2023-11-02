import React, { useEffect, useState } from "react"
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material"
import SelectField from "../components/select-field"
import DatePickerField from "../components/datepicker-field"
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { merchant_data } from "../data/merchant";
import { getAccountDetailList, getAccountDetailMetadata } from "../services/retribusi";
import CustomTable from "../components/custom-table";
import CustomPagination from "../components/custom-pagination";

const LaporanWajibRetribusi = ({
    label = "Laporan Wajib Retribusi",
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
    const header = [
        {
            title: "CORPORATE NAME",
            value: "corporateName",
            align: "left",
            width: "200px",
        },
        {
            title: "STORE CODE",
            value: "storeCode",
            align: "left",
            width: "250px",
        },
        {
            title: "ACCOUNT NAME",
            value: "accountName",
            align: "left",
            width: "200px",
        },
        {
            title: "ACCOUNT IDENTITY TYPE",
            value: "accountIdentityType",
            align: "left",
            width: "200px",
        },
        {
            title: "ACCOUNT IDENTITY",
            value: "accountIdentity",
            align: "left",
            width: "200px",
        },
        {
            title: "BUSINESS TYPE",
            value: "businessType",
            align: "left",
            width: "200px",
        },
        {
            title: "ACCOUNT ADDRESS",
            value: "accountAddress",
            align: "left",
            width: "200px",
        },
        {
            title: "ACCOUNT EMAIL",
            value: "accountEmail",
            align: "left",
            width: "200px",
        },
        {
            title: "STORE AREA",
            value: "storeArea",
            align: "left",
            width: "200px",
        },
        {
            title: "ACCOUNT DETAIL QR",
            value: "accountDetailQR",
            align: "left",
            width: "200px",
        },
    ]
    const renderCell = (item, header) => {
        if (header.value === "corporateName") {
            return <span>{item.corporateName}</span>;
        } else if (header.value === "storeCode") {
            return <span>{item.storeCode}</span>;
        } else if (header.value === "accountName") {
            return <span>{item.accountName}</span>;
        } else if (header.value === "accountIdentityType") {
            return <span>{item.accountIdentityType}</span>;
        } else if (header.value === "accountIdentity") {
            return <span>{item.accountIdentity}</span>;
        } else if (header.value === "businessType") {
            return <span>{item.businessType}</span>;
        } else if (header.value === "accountAddress") {
            return <span>{item.accountAddress}</span>;
        } else if (header.value === "accountEmail") {
            return <span>{item.accountEmail}</span>;
        } else if (header.value === "storeArea") {
            return <span>{item.storeArea}</span>;
        } else if (header.value === "accountDetailQR") {
            return <span>{item.accountDetailQR}</span>;
        }

        return <span>{item[header.value] ? item[header.value] : "-"}</span>;
    };
    useEffect(() => {
        let merchantArr = [];
        merchantData?.map((item) => {
            merchantArr.push({
                ...item,
                label: item?.ouName,
                value: item?.ouCode
            })
        })
        setMerchantOption(merchantArr);
    }, [merchantData]);

    const handleGetListAccountDetail = ({
        limitDt,
        offsetDt
    }) => {
        let ouCodeValue = ouCode?.value || ""
        let countResult = 0;
        let data = {
            "outletCode": [
                ouCodeValue
            ],
            "limit": limitDt,
            "offset": offsetDt
        }
        setCountLoading(true)
        getAccountDetailMetadata({
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
        getAccountDetailList(data).then((res) => {
            if (res?.result) {
                setData(res?.result)
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
    console.log(data)
    const pageChange = async (value) => {
        var ofset = value * limit;
        setOffset(ofset);
        handleGetListAccountDetail({ limitDt: limit, offsetDt: offset });
    };

    const rowsChange = async (e) => {
        setOffset(0);
        setLimit(e.props.value);
        handleGetListAccountDetail({ limitDt: e.props.value, offsetDt: 0 });
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
                                gridTemplateColumns: ["repeat(1, 1fr)", "repeat(3, 1fr)"],
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
                                <Button sx={{ bgcolor: "green" }} startIcon={<FileOpenIcon />} variant="contained">Export Excel</Button>
                                <Button disabled={!ouCode ? true : false} onClick={() => handleGetListAccountDetail({ limitDt: 25, offsetDt: 0 })} startIcon={<SearchIcon />} variant="contained">Filter</Button>
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

export default LaporanWajibRetribusi