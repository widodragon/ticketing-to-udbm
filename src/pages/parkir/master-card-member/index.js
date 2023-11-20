import React, { useEffect, useState } from "react"
import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import SelectField from "../../../components/select-field"
import SearchIcon from '@mui/icons-material/Search';
import { getCardMemberList, getCardMemberMetadata } from "../../../services/parkir/member";
import CustomTable from "../../../components/custom-table";
import CustomPagination from "../../../components/custom-pagination";
import FilterMessageNote from "../../../components/filter-message-note";
import CustomButton from "../../../components/custom-button";
import InputField from "../../../components/input-field";
import { merchant_data } from "../../../data/merchant"
import DatePickerField from "../../../components/datepicker-field";
import moment from "moment";

const MasterCardMember = ({
    label = "Member",
    titleInfo = "To Display Specific Transactions, Use the Filters Above.",
    subTitleInfo = [],
    merchantData = merchant_data,
    setLoading = () => { },
    notify = () => { },
    buttomFilter = "Search",
}) => {
    const [merchantOption, setMerchantOption] = useState([])
    const [limit, setLimit] = useState(25);
    const [offset, setOffset] = useState(0);
    const [ouCodeSelected, setOuCodeSelected] = useState([]);
    const [count, setCount] = useState(-99);
    const [countLoading, setCountLoading] = useState(false);
    const [disableNext, setDisableNext] = useState(false);
    const [filterForm, setFilterForm] = useState({
        ouCode: "",
        keyword: "",
        nopol: "",
        status: "",
        startDate: null,
        endDate: null
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
            title: "KODE MEMBER",
            value: "partnerCode",
            align: "left",
            width: "200px",
        },
        {
            title: "NAMA",
            value: "name",
            align: "left",
            width: "250px",
        },
        {
            title: "UNIT BISNIS",
            value: "ouName",
            align: "left",
            width: "250px",
        },
        {
            title: "MASA BERLAKU MEMBER",
            value: "expMember",
            align: "left",
            width: "250px",
        },
        {
            title: "NAMA PRODUK",
            value: "productName",
            align: "left",
            width: "250px",
        },
        {
            title: "TANGGAL REGISTRASI",
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
            title: "NOPOL",
            value: "vehicleNumber",
            align: "left",
            width: "250px",
        },
        {
            title: "NO KARTU",
            value: "cardNumber",
            align: "left",
            width: "250px",
        },
        {
            title: "STATUS MEMBER",
            value: "active",
            align: "left",
            width: "200px",
        },
        {
            title: "DIBUAT",
            value: "createdBy",
            align: "left",
            width: "200px",
        },
        {
            title: "TANGGAL BUAT",
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
            return <span>{item.dateFrom} s/d {item.dateTo}</span>;
        } else if (header.value === "productName") {
            return <span>{item.productName}</span>;
        } else if (header.value === "registeredDatetime") {
            return <span>{moment(item.registeredDatetime).format("YYYY-MM-DD HH:mm:ss")}</span>;
        } else if (header.value === "roleType") {
            return <span>{item.roleType}</span>;
        } else if (header.value === "typePartner") {
            return <span>{item.typePartner}</span>;
        } else if (header.value === "vehicleNumber") {
            return <span>{item.vehicleNumber}</span>;
        } else if (header.value === "active") {
            if (item.status === "ACTIVE") {
                return (
                    <Box
                        sx={{
                            display: "flex",
                            px: 2,
                            py: 1,
                            bgcolor: "#eaf5ea",
                            color: "#4caf50",
                            opacity: 0.9,
                            width: "max-content",
                            borderRadius: 12,
                            justifyContent: "center"
                        }}
                    >
                        <span>{item.status}</span>
                    </Box>
                )
            } else {
                return (
                    <Box
                        sx={{
                            display: "flex",
                            px: 2,
                            py: 1,
                            bgcolor: "#f5eaeb",
                            color: "#f62533",
                            opacity: 0.9,
                            width: "max-content",
                            borderRadius: 12,
                            justifyContent: "center"
                        }}
                    >
                        <span>{item.status}</span>
                    </Box>
                )
            }
        } else if (header.value === "createdBy") {
            return <span>{item.createdBy}</span>;
        } else if (header.value === "createdAt") {
            return <span>{moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>;
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

    const handleGetListCardMember = ({
        limitDt,
        offsetDt,
        ouCodeValue,
        filter
    }) => {
        let countResult = 0;
        let data = {
            "keyword": filter.keyword,
            "ascDesc": "ASC",
            "statusMember": filter.status,
            "columnOrderName": "",
            "outletCode": ouCodeValue,
            "limit": limitDt,
            "offset": offsetDt
        }
        setLoading(true);
        setCountLoading(true)
        setOuCodeSelected(ouCodeValue);
        getCardMemberMetadata({
            "keyword": filter.keyword,
            "ascDesc": "ASC",
            "statusMember": filter.status,
            "columnOrderName": "",
            "outletCode": ouCodeValue,
            "limit": limitDt,
            "offset": offsetDt
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
        getCardMemberList(data).then((res) => {
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
        handleGetListCardMember({ limitDt: limit, offsetDt: ofset, ouCodeValue: ouCodeSelected, filter: filterForm });
    };

    const rowsChange = async (e) => {
        setOffset(0);
        setLimit(e.props.value);
        handleGetListCardMember({ limitDt: e.props.value, offsetDt: 0, ouCodeValue: ouCodeSelected, filter: filterForm });
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
        handleGetListCardMember({ limitDt: limit, offsetDt: 0, ouCodeValue: ouCodeArr, filter: filterForm })
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
                                    label={"NOPOL"}
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
                                    label={"Status Member"}
                                    placeholder="All Merchant"
                                    sx={{ width: "100%", fontSize: "16px" }}
                                    data={[
                                        {
                                            label: "",
                                            value: "SEMUA"
                                        },
                                        {
                                            label: "ACTIVE",
                                            value: "ACTIVE"
                                        },
                                        {
                                            label: "EXPIRED",
                                            value: "EXPIRED"
                                        },
                                        {
                                            label: "PRE ACTIVE",
                                            value: "PRE ACTIVE"
                                        }
                                    ]}
                                    selectedValue={filterForm.status}
                                    setValue={(val) => {
                                        setFilterForm((prev) => ({
                                            ...prev,
                                            status: val
                                        }))
                                    }}
                                />
                                <DatePickerField
                                    label={"Start Date"}
                                    placeholder="YYYY-MM-DD"
                                    sx={{ width: "100%", fontSize: "16px" }}
                                    format={"YYYY-MM-DD"}
                                    value={filterForm.startDate}
                                    onChange={(newValue) => {
                                        setFilterForm((prev) => ({
                                            ...prev,
                                            startDate: newValue
                                        }))
                                    }}
                                />
                                <DatePickerField
                                    label={"End Date"}
                                    placeholder="YYYY-MM-DD"
                                    sx={{ width: "100%", fontSize: "16px" }}
                                    format={"YYYY-MM-DD"}
                                    value={filterForm.endDate}
                                    onChange={(newValue) => {
                                        setFilterForm((prev) => ({
                                            ...prev,
                                            endDate: newValue
                                        }))
                                    }}
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
                                    onClick={() => handleGetListCardMember({ limitDt: 25, offsetDt: 0, ouCodeValue: [filterForm.ouCode.value || ""], filter: filterForm })}
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
                </CardContent>
            </Card>
        </Stack>
    )
}

export default MasterCardMember