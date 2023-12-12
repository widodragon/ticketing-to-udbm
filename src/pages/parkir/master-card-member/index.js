import React, { useMemo, useState } from "react"
import { Box, Card, CardContent, Stack, Tab, Tabs, Typography } from "@mui/material"
import MasterCardMember from "./card-member";
import MasterExpiredCardMember from "./expired-card-member";

const CardMember = ({
    label = "Kartu Member",
    titleInfo = "To Display Specific Transactions, Use the Filters Above.",
    subTitleInfo = [],
    merchantData = [],
    setLoading = () => { },
    notify = () => { },
    buttomFilter = "Search",
}) => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const tabComponent = useMemo(() => {
        let component = null
        switch (value) {
            case 0:
                component =
                    <MasterCardMember
                        buttomFilter={buttomFilter}
                        label={label}
                        subTitleInfo={subTitleInfo}
                        merchantData={merchantData}
                        notify={notify}
                        setLoading={setLoading}
                        titleInfo={titleInfo}
                    />
                break;
            case 1:
                component =
                    <MasterExpiredCardMember
                        buttomFilter={buttomFilter}
                        label={label}
                        subTitleInfo={subTitleInfo}
                        merchantData={merchantData}
                        notify={notify}
                        setLoading={setLoading}
                        titleInfo={titleInfo}
                    />
                break;
            default:
                component = null;
                break;
        }
        return component;
    }, [value]);
    return (
        <Stack direction={"column"} p={"2rem"}>
            <Card sx={{ minWidth: 275, borderRadius: "0.75rem" }}>
                <CardContent sx={{ p: "2rem", width: "100%" }}>
                    <Typography variant="h4" fontWeight="600" mb={4}>
                        {label}
                    </Typography>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Member Card" />
                        <Tab label="Expired Card Member" />
                    </Tabs>
                </CardContent>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    mt: ["-4rem"]
                }}>
                    {tabComponent}
                </Box>
            </Card>
        </Stack>
    )
}

export default CardMember