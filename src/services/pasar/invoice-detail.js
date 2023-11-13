import apiHelper from "../../utils/pasar/axios";

const getInvoiceDetailList = (data) => apiHelper.POST("/public/reporting/invoice-detail", data)
const getInvoiceDetailMetadata = (data) => apiHelper.POST("/public/record-data/invoice-detail", data)

export {
    getInvoiceDetailList,
    getInvoiceDetailMetadata
}