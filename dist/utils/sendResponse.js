const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        statusCode: data.statusCode,
        data: data.data,
        analytics: data.analytics,
        meta: data?.meta,
    });
};
export default sendResponse;
//# sourceMappingURL=sendResponse.js.map