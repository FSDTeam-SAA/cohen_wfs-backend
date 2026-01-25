import catchAsync from '../utils/catchAsync.js';
const validateRequest = (schema) => {
    return catchAsync(async (req, res, next) => {
        // We use parseAsync so we can eventually add async database checks 
        // inside our Zod schemas (e.g., checking if email is already in use)
        await schema.parseAsync({
            body: req.body,
            cookies: req.cookies,
            query: req.query,
            params: req.params,
        });
        next();
    });
};
export default validateRequest;
//# sourceMappingURL=validateRequest.js.map