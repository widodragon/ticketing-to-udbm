import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectField from "../../../../components/select-field";
import InputField from "../../../../components/input-field";
import DatePickerField from "../../../../components/datepicker-field"
import CustomButton from "../../../../components/custom-button";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SaveIcon from '@mui/icons-material/Save';
import UseMemberForm from "../hooks/useMemberForm";
import { getComboList } from "../../../../services/parkir/combo"
import { getProductPolicyList } from "../../../../services/parkir/product-policy"
const MemberForm = ({
    onOpen = () => { },
    merchantData = [],
    notify = () => { },
    refreshData = () => { }
}) => {
    const formik = UseMemberForm({
        notify: notify,
        callback: () => {
            onOpen(false)
            refreshData()
        }
    });
    const [roleList, setRoleList] = useState([])
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        let roleListOption = ["GENERAL"]
        if (formik.values.ouId) {
            getComboList(formik.values.ouId.value).then(async (res) => {
                if (res.result) {
                    res.result[0].comboName.split("|").map((item) => {
                        if (item !== "GENERAL") {
                            roleListOption.push(item)
                        }
                    })
                    setRoleList(roleListOption)
                } else {
                    setRoleList(roleListOption)
                }
            }).catch((e) => {
                setRoleList([])
                setRoleList(roleListOption)
                notify(JSON.stringify(e), "error");
            })
            getProductPolicyList(formik.values.ouId.value).then(async (res) => {
                if (res.result) {
                    setProductList(res.result.map((item) => {
                        return {
                            ...item,
                            label: item.productName,
                            value: item.productId
                        }
                    }))
                }
            }).catch((e) => {
                setProductList([])
                notify(JSON.stringify(e), "error");
            })
        }
    }, [formik.values.ouId]);

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                mt: "2rem",
                gap: 2
            }}>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: ["repeat(1, 1fr)", "repeat(2, 1fr)"],
                gap: 2
            }}>
                <SelectField
                    label={"Merchant"}
                    placeholder="All Merchant"
                    required={true}
                    sx={{ width: "100%", fontSize: "16px" }}
                    data={merchantData}
                    selectedValue={formik.values.ouId}
                    setValue={(val) => formik.setFieldValue("ouId", val)}
                    isError={formik.touched.ouId && formik.errors.ouId}
                    errorMessage={formik.touched.ouId && formik.errors.ouId}
                />
                <InputField
                    label={"Kode Member"}
                    required={true}
                    placeholder="PSR-PKR-0001, ..."
                    value={formik.values.partnerCode}
                    onChange={(e) => formik.setFieldValue("partnerCode", e.target.value)}
                    isError={formik.touched.partnerCode && formik.errors.partnerCode}
                    errorMessage={formik.touched.partnerCode && formik.errors.partnerCode}
                />
                <InputField
                    label={"Nama Depan"}
                    required={true}
                    placeholder="SAM, ..."
                    value={formik.values.firstName}
                    onChange={(e) => formik.setFieldValue("firstName", e.target.value)}
                    isError={formik.touched.firstName && formik.errors.firstName}
                    errorMessage={formik.touched.firstName && formik.errors.firstName}
                />
                <InputField
                    label={"Nama Belakang"}
                    placeholder="BUD, ..."
                    value={formik.values.lastName}
                    onChange={(e) => formik.setFieldValue("lastName", e.target.value)}
                    isError={formik.touched.lastName && formik.errors.lastName}
                    errorMessage={formik.touched.lastName && formik.errors.lastName}
                />
                <SelectField
                    label={"Group Type"}
                    placeholder="Pilih Group Type"
                    sx={{ width: "100%", fontSize: "16px" }}
                    data={roleList}
                    selectedValue={formik.values.roleType}
                    setValue={(val) => formik.setFieldValue("roleType", val)}
                    isError={formik.touched.roleType && formik.errors.roleType}
                    errorMessage={formik.touched.roleType && formik.errors.roleType}
                />
                <SelectField
                    label={"Type Member"}
                    placeholder="Pilih Type Member"
                    required={true}
                    sx={{ width: "100%", fontSize: "16px" }}
                    data={["FREEPASS", "MEMBER", "SPECIAL MEMBER"]}
                    selectedValue={formik.values.typePartner}
                    setValue={(val) => formik.setFieldValue("typePartner", val)}
                    isError={formik.touched.typePartner && formik.errors.typePartner}
                    errorMessage={formik.touched.typePartner && formik.errors.typePartner}
                />
                <InputField
                    label={"Telp"}
                    required={true}
                    placeholder="0812, ..."
                    value={formik.values.phoneNumber}
                    onChange={(e) => formik.setFieldValue("phoneNumber", e.target.value)}
                    isError={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    errorMessage={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
                <InputField
                    label={"e-Mail"}
                    placeholder="sab-bud@gmail.com, ..."
                    value={formik.values.email}
                    onChange={(e) => formik.setFieldValue("email", e.target.value)}
                    isError={formik.touched.email && formik.errors.email}
                    errorMessage={formik.touched.email && formik.errors.email}
                />
                {
                    formik.values.typePartner !== "FREEPASS" && <>
                        <DatePickerField
                            label={"Start Date"}
                            placeholder="YYYY-MM-DD"
                            sx={{ width: "100%", fontSize: "16px" }}
                            format={"YYYY-MM-DD"}
                            value={formik.values.startDate}
                            onChange={(newValue) => formik.setFieldValue("startDate", newValue)}
                            isError={formik.touched.startDate && formik.errors.startDate}
                            errorMessage={formik.touched.startDate && formik.errors.startDate}
                        />
                        <DatePickerField
                            label={"End Date"}
                            placeholder="YYYY-MM-DD"
                            sx={{ width: "100%", fontSize: "16px" }}
                            format={"YYYY-MM-DD"}
                            value={formik.values.endDate}
                            onChange={(newValue) => formik.setFieldValue("endDate", newValue)}
                            isError={formik.touched.endDate && formik.errors.endDate}
                            errorMessage={formik.touched.endDate && formik.errors.endDate}
                        />
                        <SelectField
                            label={"Produk"}
                            placeholder="Pilih Produk"
                            required={true}
                            sx={{ width: "100%", fontSize: "16px" }}
                            data={productList}
                            selectedValue={formik.values.productId}
                            setValue={(val) => formik.setFieldValue("productId", val)}
                            isError={formik.touched.productId && formik.errors.productId}
                            errorMessage={formik.touched.productId && formik.errors.productId}
                        />
                    </>
                }
                <Box sx={{
                    display: formik.values.typePartner === "FREE PASS" ? "contents" : "grid",
                    gridTemplateColumns: ["repeat(1, 1fr)", "repeat(3, 1fr)"],
                    gap: 2
                }}>
                    <SelectField
                        label={"Daftarkan"}
                        placeholder=""
                        sx={{ width: "100%", fontSize: "16px" }}
                        data={[
                            {
                                label: "MIX",
                                value: "MIX"
                            },
                            {
                                label: "NOMOR KARTU",
                                value: "CARD_NUMBER"
                            },
                            {
                                label: "NOMOR POLISI",
                                value: "VEHICLE_NUMBER"
                            }
                        ]}
                        selectedValue={formik.values.registeredType}
                        setValue={(val) => formik.setFieldValue("registeredType", val)}
                        isError={formik.touched.registeredType && formik.errors.registeredType}
                        errorMessage={formik.touched.registeredType && formik.errors.registeredType}
                    />
                    {
                        formik.values.registeredType && (formik.values.registeredType.value === "MIX" || formik.values.registeredType.value === "CARD_NUMBER") ?
                            <InputField
                                label={"Nomor Kartu"}
                                required={true}
                                placeholder="1234-e87"
                                value={formik.values.cardNumber}
                                onChange={(e) => formik.setFieldValue("cardNumber", e.target.value)}
                                isError={formik.touched.cardNumber && formik.errors.cardNumber}
                                errorMessage={formik.touched.cardNumber && formik.errors.cardNumber}
                            /> : null
                    }
                    {
                        formik.values.registeredType && (formik.values.registeredType.value === "MIX" || formik.values.registeredType.value === "VEHICLE_NUMBER") ?
                            <InputField
                                label={"NOPOL"}
                                required={true}
                                placeholder="H 986 LM"
                                value={formik.values.vehicleNumber}
                                onChange={(e) => formik.setFieldValue("vehicleNumber", e.target.value)}
                                isError={formik.touched.vehicleNumber && formik.errors.vehicleNumber}
                                errorMessage={formik.touched.vehicleNumber && formik.errors.vehicleNumber}
                            /> : null
                    }
                </Box>
            </Box>
            <Stack direction="row" justifyContent="flex-end" gap={2} mt={4}>
                <CustomButton
                    onClick={() => onOpen(false)}
                    startIcon={<KeyboardBackspaceIcon size="14px" />}
                    name={"Kembali"}
                    sx={{
                        backgroundColor: "grey"
                    }}
                >
                    Kembali
                </CustomButton>
                <CustomButton
                    onClick={() => { }}
                    endIcon={<SaveIcon size="14px" />}
                    name={"Simpan"}
                    type="submit"
                >
                    Simpan
                </CustomButton>
            </Stack>
        </Box>
    )
}

export default MemberForm;