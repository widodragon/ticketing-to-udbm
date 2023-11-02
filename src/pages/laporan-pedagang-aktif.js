import React from "react"
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material"
import InputField from "../components/Input-field"
import SelectField from "../components/select-field"
import DatePickerField from "../components/datepicker-field"
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const LaporanPedagangAktif = ({
    label = "Transaction History"
}) => {
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
                                gridTemplateColumns: ["repeat(1, 1fr)", "repeat(4, 1fr)"],
                                gap: 2
                            }}>
                                <SelectField
                                    label={"Merchant"}
                                    placeholder="All Merchant"
                                    sx={{ width: "100%", fontSize: "16px" }}
                                />
                                <SelectField
                                    label={"Payment Method"}
                                    placeholder="All Payment Method"
                                    sx={{ width: "100%", fontSize: "16px" }}
                                />
                                <DatePickerField
                                    label={"Date Range"}
                                    placeholder="All Payment Method"
                                    sx={{ width: "100%", fontSize: "16px" }}
                                />
                                <DatePickerField
                                    label={""}
                                    placeholder="All Payment Method"
                                    sx={{ width: "100%", fontSize: "16px" }}
                                />
                            </Box>
                            <Box sx={{
                                display: "grid",
                                gridTemplateColumns: ["repeat(1, 1fr)", "repeat(4, 1fr)"],
                                gap: 2,
                                mt: 1
                            }}>
                                <SelectField
                                    label={"Product"}
                                    placeholder="All Category"
                                    sx={{ width: "100%", fontSize: "16px" }}
                                />
                                <InputField
                                    label={"Document ID"}
                                    placeholder="Fill in Document ID"
                                    onChange={(e) => {

                                    }}
                                    sx={{ width: "100%", fontSize: "16px" }}
                                />
                                <InputField
                                    label={"Merchant ID"}
                                    placeholder="Fill in Merchant ID"
                                    onChange={(e) => {

                                    }}
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

export default LaporanPedagangAktif