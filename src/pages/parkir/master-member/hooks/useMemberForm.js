import { useFormik } from "formik";
import * as yup from "yup";
import { addMember } from "../../../../services/parkir/member";
import moment from "moment";

const initialValues = {
    "partnerCode": "",
    "firstName": "",
    "lastName": "",
    "roleType": "",
    "typePartner": "",
    "phoneNumber": "",
    "registeredType": {
        label: "NOMOR KARTU",
        value: "CARD_NUMBER"
    },
    "email": "",
    "startDate": null,
    "endDate": null,
    "ouId": "",
    "cardNumber": "",
    "vehicleNumber": "",
    "productId": "",
    "remark": "OPS",
    "username": "ADMIN"
}
const UseMemberForm = ({
    notify = () => { },
    callback = () => { }
}) => {
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            const body = parseInitValueToBody(values)
            addMember(body).then((_res) => {
                notify("Success add data", "success");
                callback();
            }).catch((error) => {
                notify(JSON.stringify(error), "error");
            });
        },
        validationSchema: yup.object({
            partnerCode: yup.string().required("Partner Code is required"),
            firstName: yup.string().required("First Name is required"),
            lastName: yup.string().required("Last Name is required"),
            typePartner: yup.string().required("Type Partner is required"),
            phoneNumber: yup.string().required("Phone Number is required"),
            registeredType: yup.object().required("Registered Type is required"),
            ouId: yup.object().required("Outlet Code is required"),
            cardNumber: yup.string().when("registeredType", {
                is: (registeredType) => registeredType && (registeredType.value === "CARD_NUMBER" || registeredType.value === "MIX"),
                then: () => yup.string().required("Card Number is required"),
                otherwise: () => yup.string()
            }),
            vehicleNumber: yup.string().when("registeredType", {
                is: (registeredType) => registeredType && (registeredType.value === "VEHICLE_NUMBER" || registeredType.value === "MIX"),
                then: () => yup.string().required("Vehicle Number is required"),
                otherwise: () => yup.string()
            }),
            productId: yup.string().when("typePartner", {
                is: (typePartner) => typePartner !== "FREEPASS",
                then: () => yup.object().required("Product is required"),
                otherwise: () => yup.object()
            })
        }),
        enableReinitialize: true,
    });

    const parseInitValueToBody = (values) => {
        const body = {
            "partnerCode": values.partnerCode,
            "firstName": values.firstName,
            "lastName": values.lastName,
            "roleType": values.roleType || "",
            "typePartner": values.typePartner,
            "phoneNumber": values.phoneNumber,
            "registeredType": values.registeredType.value,
            "email": values.email,
            "startDate": values.startDate ? values.startDate.format("YYYY-MM-DD") : moment(Date.now()).format("YYYY-MM-DD"),
            "endDate": values.endDate ? values.endDate.format("YYYY-MM-DD") : "2030-12-31",
            "outletCode": values.ouId.value,
            "cardNumber": values.cardNumber,
            "vehicleNumber": values.vehicleNumber,
            "productId": values.productId ? Number(values.productId.value) : -99,
            "remark": values.remark,
            "username": values.username
        }
        return body
    }

    return {
        ...formik
    }
}

export default UseMemberForm;