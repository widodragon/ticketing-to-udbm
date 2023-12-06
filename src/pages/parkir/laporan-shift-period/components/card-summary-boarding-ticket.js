import React from "react";
import CardAmountSummary from "../../../../components/card-amount-summary";

const CardSummaryBoardingTicket = ({
    summaryDetail = {},
    className = "",
    isLoading = true,
    sidebarExpanded = false
}) => {
    return (
        <div className={`grid grid-cols-12 gap-6 ${className}`}>
            <CardAmountSummary
                isLoading={isLoading}
                title="Total Amount:"
                amount={summaryDetail.grandTotal}
                sidebarExpanded={sidebarExpanded}
                rotate={90}
            />
            <CardAmountSummary
                isLoading={isLoading}
                title="Service Fee:"
                amount={summaryDetail.serviceFee}
                isCurrency={true}
                sidebarExpanded={sidebarExpanded}
            />
            <CardAmountSummary
                isLoading={isLoading}
                title="MDR:"
                amount={summaryDetail.mdr}
                isCurrency={true}
                sidebarExpanded={sidebarExpanded}
            />
        </div>
    );
};

export default CardSummaryBoardingTicket;
