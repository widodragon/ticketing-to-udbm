import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import React from "react";

const SelectField = ({
    label,
    placeholder,
    ...other
}) => {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },
    ]
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
            <Typography color={"gray"} fontWeight={"600"} height={25}>{label}</Typography>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                renderInput={(params) => <TextField variant="standard" {...params} placeholder={placeholder} />}
                {...other}
            />
        </Box>
    )
}
export default SelectField;