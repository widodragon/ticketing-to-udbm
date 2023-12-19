import React, { useEffect, useState } from "react"
import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import SelectField from "../../../components/select-field"
import SearchIcon from '@mui/icons-material/Search';
import { getMemberList, getMemberMetadata } from "../../../services/parkir/member";
import CustomTable from "../../../components/custom-table";
import CustomPagination from "../../../components/custom-pagination";
import FilterMessageNote from "../../../components/filter-message-note";
import CustomButton from "../../../components/custom-button";
import InputField from "../../../components/text-field";
import AddIcon from '@mui/icons-material/Add';
import MemberForm from "./forms/member-form";
import StatusLabel from "../../../components/status-label";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { dateFormatWithTime } from "../../../utils/dateformat";

const MasterMember = ({
    label = "Member",
    titleInfo = "To Display Specific Transactions, Use the Filters Above.",
    subTitleInfo = [],
    merchantData = [],
    setLoading = () => { },
    notify = () => { },
    buttomFilter = "Search",
    buttonAdd = "Add Data"
}) => {
    const [merchantOption, setMerchantOption] = useState([])
    const [ouCode, setOuCode] = useState("")
    const [limit, setLimit] = useState(25);
    const [offset, setOffset] = useState(0);
    const [ouCodeSelected, setOuCodeSelected] = useState([]);
    const [count, setCount] = useState(-99);
    const [countLoading, setCountLoading] = useState(false);
    const [allOutletCodeList, setAllOutletCodeList] = useState([])
    const [disableNext, setDisableNext] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [keyword, setKeyword] = useState("")
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
            title: "TELEPHONE",
            value: "phoneNumber",
            align: "left",
            width: "200px",
        },
        {
            title: "EMAIL",
            value: "email",
            align: "left",
            width: "200px",
        },
        {
            title: "MEMBER STATUS",
            value: "active",
            align: "left",
            width: "200px",
        },
        {
            title: "ACTIVE AT",
            value: "activeAt",
            align: "left",
            width: "200px",
        },
        {
            title: "NON ACTIVE AT",
            value: "nonActiveAt",
            align: "left",
            width: "200px",
        },
        {
            title: "EXT MEMBER ID",
            value: "extPartnerId",
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
        } else if (header.value === "phoneNumber") {
            return <span>{item.phoneNumber}</span>;
        } else if (header.value === "email") {
            return <span>{item.email}</span>;
        } else if (header.value === "active") {
            if (item.active === "Y") {
                return (
                    <StatusLabel
                        variant="active"
                        icon={<CheckCircleIcon sx={{ color: "white" }} />}
                        label="ACTIVE"
                    />
                )
            } else {
                return (
                    <StatusLabel
                        variant="inactive"
                        icon={<HighlightOffIcon sx={{ color: "white" }} />}
                        label="INACTIVE"
                    />
                )
            }
        } else if (header.value === "activeAt") {
            return <span>{dateFormatWithTime(item.activeAt)}</span>;
        } else if (header.value === "nonActiveAt") {
            return <span>{item.nonActiveAt}</span>;
        } else if (header.value === "extPartnerId") {
            return <span>{item.extPartnerId}</span>;
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

    const handleGetListMember = ({
        limitDt,
        offsetDt,
        ouCodeValue,
        keyword
    }) => {
        let countResult = 0;
        let data = {
            "keyword": keyword,
            "ascDesc": "ASC",
            "statusMember": "",
            "columnOrderName": "",
            "outletCode": ouCodeValue,
            "limit": limitDt,
            "offset": offsetDt
        }
        setLoading(true);
        setCountLoading(true)
        setOuCodeSelected(ouCodeValue);
        getMemberMetadata({
            "keyword": keyword,
            "outletCode": ouCodeValue,
            "statusMember": "",
            "ascDesc": "ASC",
            "columnOrderName": "",
            "limit": 3,
            "offset": 0
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
        getMemberList(data).then((res) => {
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
        handleGetListMember({ limitDt: limit, offsetDt: ofset, ouCodeValue: ouCodeSelected, keyword: keyword });
    };

    const rowsChange = async (e) => {
        setOffset(0);
        setLimit(e.props.value);
        handleGetListMember({ limitDt: e.props.value, offsetDt: 0, ouCodeValue: ouCodeSelected, keyword: keyword });
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
        handleGetListMember({ limitDt: limit, offsetDt: 0, ouCodeValue: ouCodeArr, keyword: keyword })
    }

    if (openForm) {
        return (
            <Stack direction={"column"} p={"2rem"}>
                <Card sx={{ minWidth: 275, borderRadius: "0.75rem" }}>
                    <CardContent sx={{ p: "2rem" }}>
                        <Box display="flex" flexDirection="column">
                            <Typography variant="h4" fontWeight="600">
                                Add New Parking Member
                            </Typography>
                            <MemberForm
                                onOpen={setOpenForm}
                                merchantData={merchantOption}
                                notify={notify}
                                refreshData={() => {
                                    refreshData();
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Stack>
        )
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
                                    selectedValue={ouCode}
                                    setValue={setOuCode}
                                />
                                <InputField
                                    label={"Keyword"}
                                    placeholder="PSR-PKR-0003, SAM, BUD, ..."
                                    onChange={(e) => setKeyword(e.target.value)}
                                    value={keyword}
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
                                        handleGetListMember({ limitDt: 25, offsetDt: 0, ouCodeValue: ouCode ? [ouCode.value] : allOutletCodeList, keyword: keyword })
                                    }}
                                    startIcon={<SearchIcon size="14px" />}
                                    name={buttomFilter}
                                >
                                    Filter
                                </CustomButton>
                            </div>
                        </Stack>
                        <Box sx={{ width: "100%", mt: 10 }}>
                            <CustomButton
                                onClick={() => setOpenForm(true)}
                                startIcon={<AddIcon size="14px" />}
                                name={buttonAdd}
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

export default MasterMember