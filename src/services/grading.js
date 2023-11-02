import apiHelper from "../utils/axios";

const getGradingList = (data) => apiHelper.POST("/public/reporting/grading", data)
const getGradingMetadata = (data) => apiHelper.POST("/public/record-data/grading", data)

export {
    getGradingList,
    getGradingMetadata
}