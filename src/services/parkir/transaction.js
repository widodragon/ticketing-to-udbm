import apiHelper from "../../utils/parkir/axios";
const getTransactionShiftPeriod = (data) => apiHelper.POST_TRX("/trx-without-auth/list", data)
const getSummaryTransactionShiftPeriod = (data) => apiHelper.POST_TRX("/trx-without-auth/summary", data)
const getTransactionDetailById = (id) => apiHelper.GET_TRX("/trx-without-auth/detail/" + id)

export {
    getTransactionShiftPeriod,
    getSummaryTransactionShiftPeriod,
    getTransactionDetailById
}