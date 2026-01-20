import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: Record<string, unknown>,
  secret: Secret,
  expiresIn: string
) => {
  // Define options first and cast the WHOLE object to SignOptions
  const options = {
    expiresIn: expiresIn,
  } as SignOptions;

  return jwt.sign(jwtPayload, secret, options);
};