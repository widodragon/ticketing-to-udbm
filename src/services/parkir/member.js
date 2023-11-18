import apiHelper from "../../utils/parkir/axios";

const getMemberList = (data) => apiHelper.POST("/member-without-auth/list-member", data)
const getMemberMetadata = (data) => apiHelper.POST("/member-without-auth/count-member", data)
const addMember = (data) => apiHelper.POST("/member-without-auth/add", data)
const getInquiryMemberList = (data) => apiHelper.POST("/member-without-auth/list-inquiry-report-cardmember", data)
const getInquiryMemberMetadata = (data) => apiHelper.POST("/member-without-auth/count-inquiry-report-cardmember", data)

export {
    getMemberList,
    getMemberMetadata,
    getInquiryMemberList,
    getInquiryMemberMetadata,
    addMember
}