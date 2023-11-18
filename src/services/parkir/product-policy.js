import apiHelper from "../../utils/parkir/axios";
const getProductPolicyList = (outletCode) => apiHelper.GET("/policyOuProduct-without-auth/list-product-policy-ou/" + outletCode)

export {
    getProductPolicyList
}