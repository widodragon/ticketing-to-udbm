import apiHelper from "../../utils/parkir/axios";

const getMemberList = (data) => apiHelper.POST("/member-without-auth/list-member", data)
const getMemberMetadata = (data) => apiHelper.POST("/member-without-auth/list-member", data)

export {
    getMemberList,
    getMemberMetadata
}