import apiHelper from "../../utils/pasar/axios";

const getInvoiceList = (data) => apiHelper.POST("/public/reporting/invoice", data)
const getInvoiceMetadata = (data) => apiHelper.POST("/public/record-data/invoice", data)

export {
    getInvoiceList,
    getInvoiceMetadata
}