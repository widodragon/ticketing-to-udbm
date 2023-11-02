import { Box, Input, Typography } from "@mui/material";

const InputField = ({
    label,
    ...other
}) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
            <Typography color={"gray"} fontWeight={"600"} height={25}>{label}</Typography>
            <Input
                {...other}
            />
        </Box>
    )
}

export default InputField;