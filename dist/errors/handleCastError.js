const handleCastError = (error) => {
    const errorSource = [
        {
            path: error?.path,
            message: error?.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Invalid ID",
        errorSource,
    };
};
export default handleCastError;
//# sourceMappingURL=handleCastError.js.map