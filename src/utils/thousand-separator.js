const thousandSeparator = (value) => {
    if (value === "" || value === undefined || value === null) {
        return "";
    } else {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}

export { thousandSeparator }