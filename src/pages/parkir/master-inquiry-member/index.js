import React, { useEffect, useState } from "react"
import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import SelectField from "../../../components/select-field"
import SearchIcon from '@mui/icons-material/Search';
import CustomTable from "../../../components/custom-table";
import CustomPagination from "../../../components/custom-pagination";
import FilterMessageNote from "../../../components/filter-message-note";
import CustomButton from "../../../components/custom-button";
import { getInquiryMemberList, getInquiryMemberMetadata } from "../../../services/parkir/member";
import { dateFormat, dateFormatWithTime } from "../../../utils/dateformat";
import StatusLabel from "../../../components/status-label";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const MasterInquiryMember = ({
    label = "Laporan Kartu Member",
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
    const [status, setStatus] = useState("")
    const [ouCodeSelected, setOuCodeSelected] = useState([]);
    const [count, setCount] = useState(-99);
    const [countLoading, setCountLoading] = useState(false);
    const [disableNext, setDisableNext] = useState(false);
    const [data, setData] = useState([]);
    const header = [
        {
            title: "#",
            value: "id",
            align: "left",
            width: "50px",
        },
        {
            title: "MEMBER CODE",
            value: "partnerCode",
            align: "left",
            width: "200px",
        },
        {
            title: "NAME",
            value: "name",
            align: "left",
            width: "250px",
        },
        {
            title: "MERCHANT",
            value: "ouName",
            align: "left",
            width: "250px",
        },
        {
            title: "MEMBER EXPIRATION",
            value: "expMember",
            align: "left",
            width: "250px",
        },
        {
            title: "PRODUCT NAME",
            value: "productName",
            align: "left",
            width: "250px",
        },
        {
            title: "REGISTRATION DATE",
            value: "registeredDatetime",
            align: "left",
            width: "250px",
        },
        {
            title: "GROUP TYPE",
            value: "roleType",
            align: "left",
            width: "250px",
        },
        {
            title: "TYPE MEMBER",
            value: "typePartner",
            align: "left",
            width: "250px",
        },
        {
            title: "LICENSE PLATE",
            value: "vehicleNumber",
            align: "left",
            width: "250px",
        },
        {
            title: "CARD NUMBER",
            value: "cardNumber",
            align: "left",
            width: "250px",
        },
        {
            title: "MEMBER STATUS",
            value: "active",
            align: "left",
            width: "200px",
        },
        {
            title: "MADE BY",
            value: "createdBy",
            align: "left",
            width: "200px",
        },
        {
            title: "CREATION DATE",
            value: "createdAt",
            align: "left",
            width: "200px",
        },
    ]
    const renderCell = (item, header, index) => {
        if (header.value === "id") {
            let page = (offset / limit) + 1
            return <span>{(index + 1) + ((page - 1) * 10)}</span>;
        } else if (header.value === "partnerCode") {
            return <span>{item.partnerCode}</span>;
        } else if (header.value === "name") {
            return <span>{item.firstName + " " + item.lastName}</span>;
        } else if (header.value === "ouName") {
            return <span>{item.ouName}</span>;
        } else if (header.value === "expMember") {
            return <span>{dateFormat(item.dateFrom)} s/d {dateFormat(item.dateTo)}</span>;
        } else if (header.value === "productName") {
            return <span>{item.productName}</span>;
        } else if (header.value === "registeredDatetime") {
            return <span>{dateFormatWithTime(item.registeredDatetime)}</span>;
        } else if (header.value === "roleType") {
            return <span>{item.roleType}</span>;
        } else if (header.value === "typePartner") {
            return <span>{item.typePartner}</span>;
        } else if (header.value === "vehicleNumber") {
            return <span>{item.vehicleNumber}</span>;
        } else if (header.value === "active") {
            if (item.status === "ACTIVE") {
                return (
                    <StatusLabel
                        variant="active"
                        icon={<CheckCircleIcon sx={{ color: "white" }} />}
                        label={item.status}
                    />
                )
            } else {
                return (
                    <StatusLabel
                        variant="inactive"
                        icon={<HighlightOffIcon sx={{ color: "white" }} />}
                        label={item.status}
                    />
                )
            }
        } else if (header.value === "createdBy") {
            return <span>{item.createdBy}</span>;
        } else if (header.value === "createdAt") {
            return <span>{dateFormatWithTime(item.createdAt)}</span>;
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

    const handleGetListInquiryMember = ({
        limitDt,
        offsetDt,
        ouCodeValue,
        status
    }) => {
        let countResult = 0;
        let data = {
            "outletCode": ouCodeValue,
            "keyword": "",
            "statusMember": status,
            "ascDesc": "ASC",
            "columnOrderName": "",
            "limit": limitDt,
            "offset": offsetDt,
        }
        setLoading(true);
        setCountLoading(true)
        setOuCodeSelected(ouCodeValue);
        getInquiryMemberMetadata({
            "outletCode": ouCodeValue,
            "keyword": "",
            "statusMember": status,
            "ascDesc": "ASC",
            "columnOrderName": "",
            "limit": limitDt,
            "offset": offsetDt,
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
        getInquiryMemberList(data).then((res) => {
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
        handleGetListInquiryMember({ limitDt: limit, offsetDt: ofset, ouCodeValue: ouCodeSelected, status: status.value || "" });
    };

    const rowsChange = async (e) => {
        setOffset(0);
        setLimit(e.props.value);
        handleGetListInquiryMember({ limitDt: e.props.value, offsetDt: 0, ouCodeValue: ouCodeSelected, status: status.value || "" });
    };

    useEffect(() => {
        if (merchantOption.length > 0) {
            let ouCodeArr = []
            merchantOption.map((item) => {
                ouCodeArr.push(item.value)
            })
            handleGetListInquiryMember({ limitDt: limit, offsetDt: 0, ouCodeValue: ouCodeArr, status: status.value || "" })
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
                                <SelectField
                                    label={"Member Status"}
                                    placeholder="All Status"
                                    sx={{ width: "100%", fontSize: "16px" }}
                                    data={[
                                        {
                                            label: "ALL STATUS",
                                            value: ""
                                        },
                                        {
                                            label: "ACTIVE",
                                            value: "ACTIVE"
                                        },
                                        {
                                            label: "EXPIRED",
                                            value: "EXPIRED"
                                        }
                                    ]}
                                    selectedValue={status}
                                    setValue={setStatus}
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
                                    onClick={() => {
                                        setLimit(25)
                                        setOffset(0)
                                        handleGetListInquiryMember({ limitDt: 25, offsetDt: 0, ouCodeValue: ouCode ? [ouCode.value] : null, status: status ? status.value : "" })
                                    }}
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

export default MasterInquiryMember