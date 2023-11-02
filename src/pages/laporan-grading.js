import React, { useEffect, useState } from "react"
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material"
import SelectField from "../components/select-field"
import DatePickerField from "../components/datepicker-field"
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { merchant_data } from "../data/merchant";

const LaporanGrading = ({
    label = "Laporan Grading",
    merchantData = merchant_data
}) => {
    const [merchantOption, setMerchantOption] = useState([])
    const [ouCode, setOuCode] = useState("")
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
                                gridTemplateColumns: ["repeat(1, 1fr)", "repeat(2, 1fr)"],
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
                                />
                            </Box>
                        </Stack>
                        <Stack direction={["column", "row"]} gap={2} alignItems={["end", "inherit"]} justifyContent="space-between" mt={5}>
                            <Box sx={{ py: 2, px: 5, bgcolor: "#f3f5f8", borderRadius: "20px", display: "flex", alignItems: "center", gap: 1 }}>
                                <InfoIcon sx={{ fontSize: "16px", color: "#4e91d0" }} />
                                <Typography variant="p" fontWeight="600" color="#677489">
                                    To Display Specific Transactions, Use the Filters Above.
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
                                <Button sx={{ bgcolor: "green" }} startIcon={<FileOpenIcon />} variant="contained">Export Excel</Button>
                                <Button startIcon={<SearchIcon />} variant="contained">Filter</Button>
                            </Box>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Stack>
    )
}

export default LaporanGrading