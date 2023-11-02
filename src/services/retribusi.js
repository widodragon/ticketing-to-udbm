import apiHelper from "../utils/axios";

const getAccountDetailList = (data) => apiHelper.POST("/public/reporting/account-detail", data)
const getAccountDetailMetadata = (data) => apiHelper.POST("/public/record-data/account-detail", data)

export {
    getAccountDetailList,
    getAccountDetailMetadata
}