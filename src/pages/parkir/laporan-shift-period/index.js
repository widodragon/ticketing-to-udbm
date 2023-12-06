import React, { useEffect, useState } from "react"
import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import SelectField from "../../../components/select-field"
import SearchIcon from '@mui/icons-material/Search';
import CustomTable from "../../../components/custom-table";
import CustomPagination from "../../../components/custom-pagination";
import FilterMessageNote from "../../../components/filter-message-note";
import CustomButton from "../../../components/custom-button";
import InputField from "../../../components/text-field";
import DatePickerField from "../../../components/datepicker-field";
import { dateFormatWithTime } from "../../../utils/dateformat";
import { getSummaryTransactionShiftPeriod, getTransactionShiftPeriod } from "../../../services/parkir/transaction";
import { thousandSeparator } from "../../../utils/thousand-separator";
import TimePickerField from "../../../components/timepicker-field";
import moment from "moment";
import { getComboPaymentMethodList } from "../../../services/parkir/combo";
import CardSummaryBoardingTicket from "./components/card-summary-boarding-ticket";

const LaporanShiftPeriod = ({
    label = "Laporan Transaksi Parkir",
    titleInfo = "To Display Specific Transactions, Use the Filters Above.",
    subTitleInfo = [],
    merchantData = [],
    setLoading = () => { },
    notify = () => { },
    buttomFilter = "Search",
    sidebarExpanded = false
}) => {
    const [merchantOption, setMerchantOption] = useState([])
    const [limit, setLimit] = useState(25);
    const [offset, setOffset] = useState(0);
    const [ouCodeSelected, setOuCodeSelected] = useState([]);
    const [count, setCount] = useState(-99);
    const [countLoading, setCountLoading] = useState(false);
    const [disableNext, setDisableNext] = useState(false);
    const [allOutletCodeList, setAllOutletCodeList] = useState([])
    const [paymentMethodList, setPaymentMethodList] = useState([]);
    const [detail, setDetail] = useState({});
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [filterForm, setFilterForm] = useState({
        ouCode: "",
        keyword: "",
        nopol: "",
        paymentMethod: "",
        startDate: moment(Date.now()),
        startTime: moment(moment(Date.now()).format("YYYY-MM-DD") + " 00:00"),
        endDate: moment(Date.now()).add('days', 1),
        endTime: moment(moment(Date.now()).add('days', 1).format("YYYY-MM-DD") + " 23:59")
    })

    const [data, setData] = useState([]);
    const header = [
        {
            title: "#",
            value: "id",
            align: "left",
            width: "50px",
        },
        {
            title: "DOC NO",
            value: "docNo",
            align: "left",
            width: "300px",
        },
        {
            title: "Date",
            value: "docDate",
            align: "left",
            width: "200px",
        },
        {
            title: "MERCHANT DOC NO",
            value: "extDocNo",
            align: "left",
            width: "250px",
        },
        {
            title: "UNIT BUSINESS CODE",
            value: "ouCode",
            align: "left",
            width: "250px",
        },
        {
            title: "UNIT BUSINESS NAME",
            value: "ouName",
            align: "left",
            width: "250px",
        },
        {
            title: "MEMBER CODE",
            value: "memberCode",
            align: "left",
            width: "250px",
        },
        {
            title: "MEMBER NAME",
            value: "memberName",
            align: "left",
            width: "250px",
        },
        {
            title: "CARD UID",
            value: "cardNumberUuid",
            align: "left",
            width: "250px",
        },
        {
            title: "CARD NUMBER",
            value: "cardPan",
            align: "left",
            width: "250px",
        },
        {
            title: "PRODUCT CODE",
            value: "productCode",
            align: "left",
            width: "250px",
        },
        {
            title: "PRODUCT",
            value: "productName",
            align: "left",
            width: "250px",
        },
        {
            title: "GATE",
            value: "gate",
            align: "left",
            width: "250px",
        },
        {
            title: "LICENSE PLATE IN",
            value: "vehicleNumberIn",
            align: "left",
            width: "250px",
        },
        {
            title: "LICENSE PLATE OUT",
            value: "vehicleNumberOut",
            align: "left",
            width: "250px",
        },
        {
            title: "TOTAL",
            value: "grandTotal",
            align: "left",
            width: "200px",
        },
        {
            title: "SERVICE FEE",
            value: "serviceFee",
            align: "left",
            width: "200px",
        },
        {
            title: "MDR",
            value: "mdr",
            align: "left",
            width: "200px",
        },
        {
            title: "TOTAL NETT",
            value: "subTotal",
            align: "left",
            width: "200px",
        },
        {
            title: "USERNAME",
            value: "username",
            align: "left",
            width: "200px",
        },
        {
            title: "PAYMENT METHOD",
            value: "paymentMethod",
            align: "left",
            width: "200px",
        },
        {
            title: "PAYMENT DOC NO",
            value: "paymentRefDocNo",
            align: "left",
            width: "330px",
        },
        {
            title: "STATUS",
            value: "statusDesc",
            align: "left",
            width: "200px",
        },
        {
            title: "SETTLEMENT DATE",
            value: "settlementDatetime",
            align: "left",
            width: "200px",
        },
        {
            title: "DEDUCT DATE",
            value: "deductDatetime",
            align: "left",
            width: "200px",
        },
    ]

    const renderCell = (item, header, index) => {
        if (header.value === "id") {
            let page = (offset / limit) + 1
            return <span>{(index + 1) + ((page - 1) * 10)}</span>;
        } else if (header.value === "docNo") {
            return <span>{item.docNo}</span>;
        } else if (header.value === "docDate") {
            return <span>{item.docDate}</span>;
        } else if (header.value === "extDocNo") {
            return <span>{item.extDocNo}</span>;
        } else if (header.value === "ouCode") {
            return <span>{item.ouCode}</span>;
        } else if (header.value === "ouName") {
            return <span>{item.ouName}</span>;
        } else if (header.value === "memberCode") {
            return <span>{item.memberCode}</span>;
        } else if (header.value === "memberName") {
            return <span>{item.memberName}</span>;
        } else if (header.value === "cardNumberUuid") {
            return <span>{item.cardNumberUuid}</span>;
        } else if (header.value === "cardPan") {
            return <span>{item.cardPan}</span>;
        } else if (header.value === "productCode") {
            return <span>{item.productCode}</span>;
        } else if (header.value === "productName") {
            return <span>{item.productName}</span>;
        } else if (header.value === "gate") {
            return <span>{item.gate}</span>;
        } else if (header.value === "vehicleNumberIn") {
            return <span>{item.vehicleNumberIn}</span>;
        } else if (header.value === "vehicleNumberOut") {
            return <span>{item.vehicleNumberOut}</span>;
        } else if (header.value === "grandTotal") {
            return <span>Rp{thousandSeparator(item.grandTotal)}</span>;
        } else if (header.value === "serviceFee") {
            return <span>Rp{thousandSeparator(item.serviceFee)}</span>;
        } else if (header.value === "mdr") {
            return <span>Rp{thousandSeparator(item.mdr)}</span>;
        } else if (header.value === "subTotal") {
            return <span>Rp{thousandSeparator(item.subTotal)}</span>;
        } else if (header.value === "username") {
            return <span>{item.username}</span>;
        } else if (header.value === "paymentMethod") {
            return <span>{item.paymentMethod}</span>;
        } else if (header.value === "paymentRefDocNo") {
            return <span>{item.paymentRefDocNo}</span>;
        } else if (header.value === "statusDesc") {
            return <span>{item.statusDesc}</span>;
        } else if (header.value === "settlementDatetime") {
            return <span>{item.settlementDatetime && dateFormatWithTime(item.settlementDatetime)}</span>;
        } else if (header.value === "deductDatetime") {
            return <span>{item.deductDatetime && dateFormatWithTime(item.deductDatetime)}</span>;
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

    useEffect(() => {
        getComboPaymentMethodList().then((res) => {
            setPaymentMethodList(res.result.map((data) => {
                return {
                    label: data.comboName,
                    value: data.comboCode
                }
            }))
        }).catch((e) => {
            notify(e.message, "error");
        })
    }, [])

    const handleGetListTransaction = ({
        limitDt,
        offsetDt,
        ouCodeValue,
        filter
    }) => {
        let countResult = 0;
        if (filter.startDate && !filter.endDate) {
            return notify("End date must be filled in correctly!", "error")
        }
        if (!filter.startDate && filter.endDate) {
            return notify("Start date must be filled in correctly!", "error")
        }
        let data = {
            "checkOutDatetimeFrom": filter.startDate ? filter.startDate.format("YYYY-MM-DD") + " " + filter.startTime.format("HH:mm") : "",
            "checkOutDatetimeTo": filter.endDate ? filter.endDate.format("YYYY-MM-DD") + " " + filter.endTime.format("HH:mm") : "",
            "mainOuList": "",
            "ouList": "",
            "outletCode": ouCodeValue,
            "status": "01",
            "keyword": filter.keyword,
            "vehicleNumber": filter.nopol,
            "paymentMethod": filterForm.paymentMethod ? filterForm.paymentMethod.value : "",
            "ColumOrderName": "",
            "ascDesc": "",
            "Start": offsetDt,
            "Length": limitDt
        }
        setLoading(true);
        setCountLoading(true)
        setOuCodeSelected(ouCodeValue);
        setLoadingDetail(true);
        getSummaryTransactionShiftPeriod({
            "checkOutDatetimeFrom": filter.startDate ? filter.startDate.format("YYYY-MM-DD") + " " + filter.startTime.format("HH:mm") : "",
            "checkOutDatetimeTo": filter.endDate ? filter.endDate.format("YYYY-MM-DD") + " " + filter.endTime.format("HH:mm") : "",
            "mainOuList": "",
            "ouList": "",
            "outletCode": ouCodeValue,
            "status": "01",
            "keyword": filter.keyword,
            "vehicleNumber": filter.nopol,
            "paymentMethod": filterForm.paymentMethod ? filterForm.paymentMethod.value : "",
            "ColumOrderName": "",
            "ascDesc": "",
            "Start": offsetDt,
            "Length": limitDt
        }).then((res) => {
            countResult = res.result.totalRecords;
            setDetail(res.result);
            setDisableNext(false);
            setCountLoading(false);
            setLoadingDetail(false)
            setCount(countResult)
        }).catch((e) => {
            setCount(-99);
            setCountLoading(false);
            setLoadingDetail(false)
            setCount(countResult)
        })
        getTransactionShiftPeriod(data).then((res) => {
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
            notify(e.message, "error");
        })
    }

    const pageChange = async (value) => {
        var ofset = value * limit;
        setOffset(ofset);
        handleGetListTransaction({ limitDt: limit, offsetDt: ofset, ouCodeValue: ouCodeSelected, filter: filterForm });
    };

    const rowsChange = async (e) => {
        setOffset(0);
        setLimit(e.props.value);
        handleGetListTransaction({ limitDt: e.props.value, offsetDt: 0, ouCodeValue: ouCodeSelected, filter: filterForm });
    };

    useEffect(() => {
        if (merchantOption.length > 0) {
            refreshData();
        }
    }, [merchantOption]);

    const refreshData = () => {
        let ouCodeArr = []
        merchantOption.map((item) => {
            ouCodeArr.push(item.value)
        })
        setAllOutletCodeList(ouCodeArr);
        handleGetListTransaction({ limitDt: limit, offsetDt: 0, ouCodeValue: ouCodeArr, filter: filterForm })
    }

    return (
        <Stack direction={"column"} p={"2rem"}>
            <Card sx={{ minWidth: 275, borderRadius: "0.75rem" }}>
                <CardContent sx={{ p: "2rem" }}>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="h4" fontWeight="600">
                            {label}
                        </Typography>
                        <Stack display="flex" direction="column" mt={"2rem"} gap={2}>
                            <Box display="flex" flexDirection="column">
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
                                            selectedValue={filterForm.ouCode}
                                            setValue={(val) => {
                                                setFilterForm((prev) => ({
                                                    ...prev,
                                                    ouCode: val
                                                }))
                                            }}
                                        />
                                        <InputField
                                            label={"Keyword"}
                                            placeholder="PSR-PKR-0003, SAM, BUD, ..."
                                            onChange={(e) => {
                                                setFilterForm((prev) => ({
                                                    ...prev,
                                                    keyword: e.target.value
                                                }))
                                            }}
                                            value={filterForm.keyword}
                                        />
                                        <InputField
                                            label={"License Plate"}
                                            placeholder="H 4433 LM, ..."
                                            onChange={(e) => {
                                                setFilterForm((prev) => ({
                                                    ...prev,
                                                    nopol: e.target.value
                                                }))
                                            }}
                                            value={filterForm.nopol}
                                        />
                                        <SelectField
                                            label={"Payment Method"}
                                            placeholder="All Payment Method"
                                            sx={{ width: "100%", fontSize: "16px" }}
                                            data={paymentMethodList}
                                            selectedValue={filterForm.paymentMethod}
                                            setValue={(val) => {
                                                setFilterForm((prev) => ({
                                                    ...prev,
                                                    paymentMethod: val
                                                }))
                                            }}
                                        />
                                        <Stack display="flex" direction="row" alignItems="center" gap={1}>
                                            <Box sx={{
                                                width: "60%"
                                            }}>
                                                <DatePickerField
                                                    label={"Start Date"}
                                                    placeholder="DD MMM YYYY"
                                                    sx={{ width: "100%", fontSize: "16px" }}
                                                    format={"DD MMM YYYY"}
                                                    value={filterForm.startDate}
                                                    onChange={(newValue) => {
                                                        setFilterForm((prev) => ({
                                                            ...prev,
                                                            startDate: newValue
                                                        }))
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{
                                                width: "40%"
                                            }}>
                                                <TimePickerField
                                                    label={""}
                                                    placeholder="00:00"
                                                    sx={{ width: "100%", fontSize: "16px" }}
                                                    format={"HH:mm"}
                                                    value={filterForm.startTime}
                                                    onChange={(newValue) => {
                                                        setFilterForm((prev) => ({
                                                            ...prev,
                                                            startTime: newValue
                                                        }))
                                                    }}
                                                />
                                            </Box>
                                        </Stack>
                                        <Stack display="flex" direction="row" alignItems="center" gap={1}>
                                            <Box sx={{
                                                width: "60%"
                                            }}>
                                                <DatePickerField
                                                    label={"End Date"}
                                                    placeholder="DD MMM YYYY"
                                                    sx={{ width: "100%", fontSize: "16px" }}
                                                    format={"DD MMM YYYY"}
                                                    value={filterForm.endDate}
                                                    onChange={(newValue) => {
                                                        setFilterForm((prev) => ({
                                                            ...prev,
                                                            endDate: newValue
                                                        }))
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{
                                                width: "40%"
                                            }}>
                                                <TimePickerField
                                                    label={""}
                                                    placeholder="00:00"
                                                    sx={{ width: "100%", fontSize: "16px" }}
                                                    format={"HH:mm"}
                                                    value={filterForm.endTime}
                                                    onChange={(newValue) => {
                                                        setFilterForm((prev) => ({
                                                            ...prev,
                                                            endTime: newValue
                                                        }))
                                                    }}
                                                />
                                            </Box>
                                        </Stack>
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
                                            onClick={() => {
                                                setLimit(25)
                                                setOffset(0)
                                                handleGetListTransaction({ limitDt: 25, offsetDt: 0, ouCodeValue: filterForm.ouCode ? [filterForm.ouCode.value] : allOutletCodeList, filter: filterForm })
                                            }}
                                            startIcon={<SearchIcon size="14px" />}
                                            name={buttomFilter}
                                        >
                                            Filter
                                        </CustomButton>
                                    </div>
                                </Stack>
                                <CardSummaryBoardingTicket
                                    className="mt-6"
                                    summaryDetail={detail}
                                    isLoading={loadingDetail}
                                    sidebarExpanded={sidebarExpanded}
                                />
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
                                        enableNumber={true}
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
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Stack>
    )
}

export default LaporanShiftPeriod