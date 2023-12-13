import React from "react";
import CardAmountSummary from "../../../../components/card-amount-summary";
import { Box } from "@mui/material";

const CardSummaryBoardingTicket = ({
    summaryDetail = {},
    isLoading = true,
    sidebarExpanded = false,
    cashBankSrc = "",
    serviceFeeSrc = "",
    mdrSrc = ""
}) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
                gap: "1.6rem"
            }}
        >
            <CardAmountSummary
                isLoading={isLoading}
                title="Total Amount:"
                amount={summaryDetail.grandTotal}
                sidebarExpanded={sidebarExpanded}
                rotate={90}
                src={cashBankSrc}
            />
            <CardAmountSummary
                isLoading={isLoading}
                title="Service Fee:"
                amount={summaryDetail.serviceFee}
                isCurrency={true}
                sidebarExpanded={sidebarExpanded}
                src={serviceFeeSrc}
            />
            <CardAmountSummary
                isLoading={isLoading}
                title="MDR:"
                amount={summaryDetail.mdr}
                isCurrency={true}
                sidebarExpanded={sidebarExpanded}
                src={mdrSrc}
            />
        </Box>
    );
};

export default CardSummaryBoardingTicket;
