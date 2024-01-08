import { Box, Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import React from "react";
import LabelField from "../../../../components/label-field"
import { dateFormatWithTime } from "../../../../utils/dateformat";
import { formatCurrency } from "../../../../utils/format-currency";
import CustomButton from "../../../../components/custom-button";

const DetailDialog = ({
    open = false,
    setOpen,
    detail
}) => {
    return (
        <Dialog
            fullWidth={true}
            maxWidth={"lg"}
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>Report Details</DialogTitle>
            <DialogContent>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    mt: "1rem",
                    mb: "1rem",
                    gap: "2rem"
                }}>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: ["auto", "auto auto auto auto"],
                        gap: "1rem"
                    }}>
                        <LabelField
                            label="Date"
                            value={dateFormatWithTime(detail.trxLogItems.createdAt)}
                        />
                        <LabelField
                            label="Gate In"
                            value={detail.trxLogItems.gateIn || "-"}
                        />
                        <LabelField
                            label="Gate Out"
                            value={detail.trxLogItems.gateOut || "-"}
                        />
                    </Box>
                    <Divider />
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: ["auto", "auto auto auto auto"],
                        gap: "1rem"
                    }}>
                        <LabelField
                            label="Payment Doc No"
                            value={detail.trxLogItems.paymentRefDocNo || "-"}
                        />
                        <LabelField
                            label="Merchant Doc No"
                            value={detail.trxLogItems.extDocNo || "-"}
                        />
                        <LabelField
                            label="Product"
                            value={detail.trxLogItems.productName || "-"}
                        />
                        <LabelField
                            label="Card Number"
                            value={detail.trxLogItems.cardNumber || "-"}
                        />

                        <LabelField
                            label="Vehicle Number In"
                            value={detail.trxLogItems.vehicleNumberIn}
                        />
                        <LabelField
                            label="Vehicle Number Out"
                            value={detail.trxLogItems.vehicleNumberOut || "-"}
                        />
                        <LabelField
                            label="Member Name"
                            value={detail.trxLogItems.memberName || "-"}
                        />
                        <LabelField
                            label="Payment Method"
                            value={detail.trxLogItems.paymentMethod || "-"}
                        />

                        <LabelField
                            label="Checkin Datetime"
                            value={dateFormatWithTime(detail.trxLogItems.checkinDatetime) || "-"}
                        />
                        <LabelField
                            label="Checkout Datetime"
                            value={dateFormatWithTime(detail.trxLogItems.checkoutDatetime) || "-"}
                        />
                        <LabelField
                            label="Duration"
                            value={detail.trxLogItems.durationTime}
                        />
                        <LabelField
                            label="Transaction Status"
                            value={detail.trxLogItems.statusDesc || "-"}
                        />
                    </Box>
                    <Divider />
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: ["auto", "auto auto auto auto"],
                        gap: "1rem"
                    }}>
                        <LabelField
                            label="Total"
                            value={formatCurrency(detail.trxLogItems.grandTotal)}
                        />
                        <LabelField
                            label="Service Fee"
                            value={formatCurrency(detail.trxLogItems.serviceFee)}
                        />
                        <LabelField
                            label="Nett Amount"
                            value={formatCurrency(detail.trxLogItems.chargeAmount)}
                        />
                    </Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <CustomButton
                            onClick={() => { setOpen(false) }}
                            // startIcon={<SearchIcon size="14px" />}
                            name={"Close"}
                        >
                            Close
                        </CustomButton>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default DetailDialog;