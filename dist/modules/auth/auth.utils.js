import jwt from 'jsonwebtoken';
export const createToken = (jwtPayload, secret, expiresIn) => {
    // Define options first and cast the WHOLE object to SignOptions
    const options = {
        expiresIn: expiresIn,
    };
    return jwt.sign(jwtPayload, secret, options);
};
//# sourceMappingURL=auth.utils.js.map