import apiHelper from "../../utils/parkir/axios";
const getComboList = (outletCode) => apiHelper.GET("/combo-without-auth/combo-constant/" + outletCode)

export {
    getComboList
}