import apiHelper from "../../utils/parkir/axios";
const getTransactionShiftPeriod = (data) => apiHelper.POST_TRX("/trx-without-auth/list", data)
const getSummaryTransactionShiftPeriod = (data) => apiHelper.POST_TRX("/trx-without-auth/summary", data)

export {
    getTransactionShiftPeriod,
    getSummaryTransactionShiftPeriod
}