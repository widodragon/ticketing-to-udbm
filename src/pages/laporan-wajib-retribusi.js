import React, { useEffect, useState } from "react"
import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import SelectField from "../components/select-field"
import SearchIcon from '@mui/icons-material/Search';
import { getAccountDetailList, getAccountDetailMetadata } from "../services/retribusi";
import CustomTable from "../components/custom-table";
import CustomPagination from "../components/custom-pagination";
import FilterMessageNote from "../components/filter-message-note";
import CustomButton from "../components/custom-button";

const LaporanWajibRetribusi = ({
    label = "Laporan Wajib Retribusi",
    titleInfo = "To Display Specific Transactions, Use the Filters Above.",
    subTitleInfo = [],
    merchantData = [],
    setLoading = () => { },
    notify = () => { },
    buttomFilter = "Search"
}) => {
    const [merchantOption, setMerchantOption] = useState([])
    const [ouCode, setOuCode] = useState("")
    const [limit, setLimit] = useState(25);
    const [offset, setOffset] = useState(0);
    const [ouCodeSelected, setOuCodeSelected] = useState([]);
    const [count, setCount] = useState(-99);
    const [countLoading, setCountLoading] = useState(false);
    const [disableNext, setDisableNext] = useState(false);
    const [data, setData] = useState([]);
    const header = [
        {
            title: "MERCHANT NAME",
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
            title: "CUSTOMER NAME",
            value: "accountName",
            align: "left",
            width: "200px",
        },
        {
            title: "ACCOUNT TYPE ID",
            value: "accountIdentityType",
            align: "left",
            width: "200px",
        },
        {
            title: "ACCOUNT ID",
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
            title: "ADDRESS",
            value: "accountAddress",
            align: "left",
            width: "200px",
        },
        {
            title: "EMAIL",
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
            title: "STORE ID",
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
        merchantData.map((item) => {
            merchantArr.push({
                ...item,
                label: item.ouName,
                value: item.ouCode
            })
        })
        setMerchantOption(merchantArr);
    }, [merchantData]);

    const handleGetListAccountDetail = ({
        limitDt,
        offsetDt,
        ouCodeValue
    }) => {
        let countResult = 0;
        let data = {
            "outletCode": ouCodeValue,
            "limit": limitDt,
            "offset": offsetDt
        }
        setLoading(true);
        setCountLoading(true)
        setOuCodeSelected(ouCodeValue);
        getAccountDetailMetadata({
            "outletCode": ouCodeValue
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
            if (res.result) {
                setData(res.result)
                notify(res.message || "Success Get Data List", "success");
            } else {
                setDisableNext(true);
                setData([]);
                notify("No Data Found", "warning");
            }
            setLoading(false)
        }).catch((e) => {
            setData([]);
            setDisableNext(true);
            setLoading(false)
            notify(JSON.stringify(e), "error");
        })
    }

    const pageChange = async (value) => {
        var ofset = value * limit;
        setOffset(ofset);
        handleGetListAccountDetail({ limitDt: limit, offsetDt: offset, ouCodeValue: ouCodeSelected });
    };

    const rowsChange = async (e) => {
        setOffset(0);
        setLimit(e.props.value);
        handleGetListAccountDetail({ limitDt: e.props.value, offsetDt: 0, ouCodeValue: ouCodeSelected });
    };

    useEffect(() => {
        if (merchantOption.length > 0) {
            let ouCodeArr = []
            merchantOption.map((item) => {
                ouCodeArr.push(item.value)
            })
            handleGetListAccountDetail({ limitDt: limit, offsetDt: 0, ouCodeValue: ouCodeArr })
        }
    }, [merchantOption]);

    return (
        <Stack direction={"column"} p={"2rem"}>
            <Card sx={{ minWidth: 275, borderRadius: "0.75rem" }}>
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
                            </Box>
                        </Stack>
                        <Stack sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: ["column", "row"],
                            alignItems: ["end", "center"],
                            gap: 3,
                            justifyContent: "space-between",
                            mt: 8
                        }}>
                            <FilterMessageNote
                                sx={{
                                    width: ["100%", "50%"]
                                }}
                                title={titleInfo}
                                subtitle={subTitleInfo}
                            />
                            <div style={{
                                display: "flex",
                                gap: 3
                            }}>
                                <CustomButton
                                    onClick={() => handleGetListAccountDetail({ limitDt: 25, offsetDt: 0, ouCodeValue: [ouCode.value || ""] })}
                                    startIcon={<SearchIcon size="14px" />}
                                    name={buttomFilter}
                                >
                                    Filter
                                </CustomButton>
                            </div>
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