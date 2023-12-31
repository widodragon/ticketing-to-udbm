import apiHelper from "../../utils/parkir/axios";

const getMemberList = (data) => apiHelper.POST("/member-without-auth/list-member", data)
const getMemberMetadata = (data) => apiHelper.POST("/member-without-auth/count-member", data)
const getCardMemberList = (data) => apiHelper.POST("/member-without-auth/list-cardmember", data)
const getCardMemberMetadata = (data) => apiHelper.POST("/member-without-auth/count-cardmember", data)
const getExpiredCardMemberList = (data) => apiHelper.POST("/member-without-auth/list-expired-cardmember", data)
const getExpiredCardMemberMetadata = (data) => apiHelper.POST("/member-without-auth/count-expired-cardmember", data)
const addMember = (data) => apiHelper.POST("/member-without-auth/add", data)
const getInquiryMemberList = (data) => apiHelper.POST("/member-without-auth/list-inquiry-report-cardmember", data)
const getInquiryMemberMetadata = (data) => apiHelper.POST("/member-without-auth/count-inquiry-report-cardmember", data)

export {
    getMemberList,
    getMemberMetadata,
    getCardMemberList,
    getCardMemberMetadata,
    getExpiredCardMemberList,
    getExpiredCardMemberMetadata,
    getInquiryMemberList,
    getInquiryMemberMetadata,
    addMember
}