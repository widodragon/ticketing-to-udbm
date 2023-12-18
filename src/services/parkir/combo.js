import apiHelper from "../../utils/parkir/axios";
const getComboList = (outletCode) => apiHelper.GET("/combo-without-auth/combo-constant/" + outletCode)
const getComboPaymentMethodList = () => apiHelper.GET("/without-auth/common/combo-constant/CTGR_PAYMENT_MENTHOD")
const getMemberTypeList = () => apiHelper.GET("/without-auth/common/combo-constant/CTGR_TYPE_MEMBER")

export {
    getComboList,
    getComboPaymentMethodList,
    getMemberTypeList
}