import { TErrorSources, TGenericErrorResponse } from '../interface/error.js';

const handleDuplicateKeyError = (err: any): TGenericErrorResponse => {
    // Extract the field name and value using Regex for better reliability 
    // with different MongoDB versions/drivers
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];

    // Get the key from keyValue object
    const field = Object.keys(err.keyValue || {})[0];

    const errorSources: TErrorSources = [
        {
            path: field || '',
            message: `${extractedMessage} is already exists`,
        },
    ];

    return {
        statusCode: 409, // Conflict
        message: 'Duplicate Key Error',
        errorSources,
    };
};

export default handleDuplicateKeyError;