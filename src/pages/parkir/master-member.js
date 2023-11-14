import React, { useEffect, useState } from "react"
import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import SelectField from "../../components/select-field"
import SearchIcon from '@mui/icons-material/Search';
import { getMemberList, getMemberMetadata } from "../../services/parkir/member";
import CustomTable from "../../components/custom-table";
import CustomPagination from "../../components/custom-pagination";
import FilterMessageNote from "../../components/filter-message-note";
import CustomButton from "../../components/custom-button";
import InputField from "../../components/input-field";
import { merchant_data } from "../../data/merchant"

const MasterMember = ({
    label = "Member",
    titleInfo = "To Display Specific Transactions, Use the Filters Above.",
    subTitleInfo = [],
    merchantData = merchant_data,
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
            title: "TELP",
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
            title: "STATUS MEMBER",
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
    const renderCell = (item, header) => {
        if (header.value === "partnerCode") {
            return <span>{item.partnerCode}</span>;
        } else if (header.value === "name") {
            return <span>{item.name}</span>;
        } else if (header.value === "phoneNumber") {
            return <span>{item.phoneNumber}</span>;
        } else if (header.value === "email") {
            return <span>{item.email}</span>;
        } else if (header.value === "active") {
            return <span>{item.active}</span>;
        } else if (header.value === "activeAt") {
            return <span>{item.activeAt}</span>;
        } else if (header.value === "nonActiveAt") {
            return <span>{item.nonActiveAt}</span>;
        } else if (header.value === "extPartnerId") {
            return <span>{item.extPartnerId}</span>;
        } else if (header.value === "createdBy") {
            return <span>{item.createdBy}</span>;
        } else if (header.value === "createdAt") {
            return <span>{item.createdAt}</span>;
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
        ouCodeValue
    }) => {
        let countResult = 0;
        let data = {
            "keyword": "",
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
        getMemberList(data).then((res) => {
            if (res.result) {
                console.log(res.result)
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
        handleGetListMember({ limitDt: limit, offsetDt: offset, ouCodeValue: ouCodeSelected });
    };

    const rowsChange = async (e) => {
        setOffset(0);
        setLimit(e.props.value);
        handleGetListMember({ limitDt: e.props.value, offsetDt: 0, ouCodeValue: ouCodeSelected });
    };

    useEffect(() => {
        if (merchantOption.length > 0) {
            let ouCodeArr = []
            merchantOption.map((item) => {
                ouCodeArr.push(item.value)
            })
            handleGetListMember({ limitDt: limit, offsetDt: 0, ouCodeValue: ouCodeArr })
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
                                <InputField
                                    label={"Keyword"}
                                    placeholder="PSR-PKR-0003, SAM, BUD, ..."
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
                                    onClick={() => handleGetListMember({ limitDt: 25, offsetDt: 0, ouCodeValue: [ouCode.value || ""] })}
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

export default MasterMember