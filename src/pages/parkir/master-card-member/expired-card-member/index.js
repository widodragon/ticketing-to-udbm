import React, { useEffect, useState } from "react"
import { Box, Button, Stack, Tooltip } from "@mui/material"
import SelectField from "../../../../components/select-field"
import SearchIcon from '@mui/icons-material/Search';
import { getExpiredCardMemberList, getExpiredCardMemberMetadata } from "../../../../services/parkir/member";
import CustomTable from "../../../../components/custom-table";
import CustomPagination from "../../../../components/custom-pagination";
import FilterMessageNote from "../../../../components/filter-message-note";
import CustomButton from "../../../../components/custom-button";
import InputField from "../../../../components/input-field";
import DatePickerField from "../../../../components/datepicker-field";
import SyncIcon from '@mui/icons-material/Sync';
import { addSyncMember } from "../../../../services/parkir/sync";
import StatusLabel from "../../../../components/status-label";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { dateFormat, dateFormatWithTime } from "../../../../utils/dateformat";

const MasterExpiredCardMember = ({
    titleInfo = "To Display Specific Transactions, Use the Filters Above.",
    subTitleInfo = [],
    merchantData = [],
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
            title: "ACTION",
            value: "action",
            align: "center",
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

    const handleSyncMember = (id) => {
        let body = {
            "ID": id
        }
        addSyncMember(body).then((res) => {
            notify(res.message || "Success Sync Data", "success");
        }).catch((e) => {
            notify(e.message, "error");
        })
    }

    const renderCell = (item, header, index) => {
        if (header.value === "id") {
            let page = (offset / limit) + 1
            return <span>{(index + 1) + ((page - 1) * 10)}</span>;
        } else if (header.value === "action") {
            return (
                <Tooltip title="Synchronize Member Cards">
                    <Button
                        type="button"
                        onClick={() => {
                            if (item.status === "ACTIVE") {
                                handleSyncMember(item.id)
                            } else {
                                notify("Sorry the card is not active", "error");
                            }
                        }}
                    >
                        <SyncIcon />
                    </Button>
                </Tooltip>
            );
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

    const handleGetListCardMember = ({
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
            "keyword": filter.keyword,
            "outletCode": ouCodeValue,
            "vehicleNumber": filter.nopol,
            "ascDesc": "ASC",
            "columnOrderName": "",
            "limit": limitDt,
            "offset": offsetDt,
            "statusMember": filter.status ? filter.status.value : "",
            "dateFromStart": filter.startDate ? filter.startDate.format("YYYY-MM-DD") : "",
            "dateFromEnd": filter.endDate ? filter.endDate.format("YYYY-MM-DD") : "",
        }
        setLoading(true);
        setCountLoading(true)
        setOuCodeSelected(ouCodeValue);
        getExpiredCardMemberMetadata({
            "keyword": filter.keyword,
            "outletCode": ouCodeValue,
            "vehicleNumber": filter.nopol,
            "ascDesc": "ASC",
            "columnOrderName": "",
            "limit": limitDt,
            "offset": offsetDt,
            "statusMember": filter.status ? filter.status.value : "",
            "dateFromStart": filter.startDate ? filter.startDate.format("YYYY-MM-DD") : "",
            "dateFromEnd": filter.endDate ? filter.endDate.format("YYYY-MM-DD") : "",
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
        getExpiredCardMemberList(data).then((res) => {
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
                            label={"Date Range"}
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
                        <DatePickerField
                            label={""}
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
                                handleGetListCardMember({ limitDt: 25, offsetDt: 0, ouCodeValue: filterForm.ouCode ? [filterForm.ouCode.value] : null, filter: filterForm })
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
    )
}

export default MasterExpiredCardMember