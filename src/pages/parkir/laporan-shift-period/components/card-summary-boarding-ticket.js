import React from "react";
import CardAmountSummary from "../../../../components/card-amount-summary";
import { Box } from "@mui/material";

const CardSummaryBoardingTicket = ({
    summaryDetail = {},
    isLoading = true,
    sidebarExpanded = false
}) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
                gap: 6
            }}
        >
            <CardAmountSummary
                isLoading={isLoading}
                title="Total Amount:"
                amount={summaryDetail.grandTotal}
                sidebarExpanded={sidebarExpanded}
                rotate={90}
                src="./images/UDB_Icon_Cash Bank.png"
            />
            <CardAmountSummary
                isLoading={isLoading}
                title="Service Fee:"
                amount={summaryDetail.serviceFee}
                isCurrency={true}
                sidebarExpanded={sidebarExpanded}
                src="./images/UDB_Icon_Service Fee_Blue.svg"
            />
            <CardAmountSummary
                isLoading={isLoading}
                title="MDR:"
                amount={summaryDetail.mdr}
                isCurrency={true}
                sidebarExpanded={sidebarExpanded}
                src="./images/UDB_Icon_Service Fee_Blue.svg"
            />
        </Box>
    );
};

export default CardSummaryBoardingTicket;
