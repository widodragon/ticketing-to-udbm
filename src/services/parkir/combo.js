import apiHelper from "../../utils/parkir/axios";
const getComboList = (outletCode) => apiHelper.GET("/combo-without-auth/combo-constant/" + outletCode)
const getComboPaymentMethodList = () => apiHelper.GET("/without-auth/common/combo-constant/CTGR_PAYMENT_MENTHOD")

export {
    getComboList,
    getComboPaymentMethodList
}