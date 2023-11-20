import apiHelper from "../../utils/parkir/axios";
const addSyncMember = (data) => apiHelper.POST("/sync/member/add", data)

export {
    addSyncMember
}