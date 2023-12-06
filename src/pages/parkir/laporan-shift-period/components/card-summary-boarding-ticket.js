import React from "react";
import CardAmountSummary from "../../../../components/card-amount-summary";
import TransactionAmount from "../../../../assets/UDB_Icon_Cash Bank.svg";
import ServiceFee from "../../../../assets/UDB_Icon_Service Fee_Blue.svg";
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
                icon={TransactionAmount}
                sidebarExpanded={sidebarExpanded}
                rotate={90}
            />
            <CardAmountSummary
                isLoading={isLoading}
                title="Service Fee:"
                amount={summaryDetail.serviceFee}
                isCurrency={true}
                icon={ServiceFee}
                sidebarExpanded={sidebarExpanded}
            />
            <CardAmountSummary
                isLoading={isLoading}
                title="MDR:"
                amount={summaryDetail.mdr}
                isCurrency={true}
                icon={ServiceFee}
                sidebarExpanded={sidebarExpanded}
            />
        </div>
    );
};

export default CardSummaryBoardingTicket;
