import React, { useEffect, useState } from "react"
import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import SelectField from "../components/select-field"
import DatePickerField from "../components/datepicker-field"
import SearchIcon from '@mui/icons-material/Search';
import CustomPagination from "../components/custom-pagination";
import CustomTable from "../components/custom-table";
import { getInvoiceList, getInvoiceMetadata } from "../services/invoice";
import { thousandSeparator } from "../utils/thousand-separator";
import moment from "moment";
import FilterMessageNote from "../components/filter-message-note";
import CustomButton from "../components/custom-button";

const LaporanInvoice = ({
    label = "Laporan Invoice",
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
    const handleGetListInvoice = ({
        limitDt,
        offsetDt,
        ouCodeValue
    }) => {
        let countResult = 0;
        let data = {
            "periode": periode ? periode.format("YYYYMM") : moment(Date.now()).format("YYYYMM"),
            "outletCode": ouCodeValue,
            "limit": limitDt,
            "offset": offsetDt
        }
        setLoading(true);
        setCountLoading(true)
        setOuCodeSelected(ouCodeValue);
        getInvoiceMetadata({
            "periode": periode ? periode.format("YYYYMM") : moment(Date.now()).format("YYYYMM"),
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
        getInvoiceList(data).then((res) => {
            if (res.result) {
                notify(res?.message || "Success Get Data List", "success");
                setData(res.result)
            } else {
                setDisableNext(true);
                setData([]);
                notify("No Data Found", "warning");
            }
            setLoading(false);
        }).catch((e) => {
            setData([]);
            setDisableNext(true);
            setLoading(false);
            notify(JSON.stringify(e), "error");
        })
    }
    const pageChange = async (value) => {
        var ofset = value * limit;
        setOffset(ofset);
        handleGetListInvoice({ limitDt: limit, offsetDt: offset, ouCodeValue: ouCodeSelected });
    };

    const rowsChange = async (e) => {
        setOffset(0);
        setLimit(e.props.value);
        handleGetListInvoice({ limitDt: e.props.value, offsetDt: 0, ouCodeValue: ouCodeSelected });
    };
    useEffect(() => {
        if (merchantOption.length > 0) {
            let ouCodeArr = []
            merchantOption.map((item) => {
                ouCodeArr.push(item.value)
            })
            handleGetListInvoice({ limitDt: limit, offsetDt: 0, ouCodeValue: ouCodeArr })
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
                                <DatePickerField
                                    label={"Year Month"}
                                    placeholder="MMM YYYY"
                                    sx={{ width: "100%", fontSize: "16px" }}
                                    value={periode}
                                    format={"MMM YYYY"}
                                    onChange={(newValue) => setPeriode(newValue)}
                                    views={['month', 'year']}
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
                                    onClick={() => handleGetListInvoice({ limitDt: 25, offsetDt: 0, ouCodeValue: [ouCode.value || ""] })}
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

export default LaporanInvoice