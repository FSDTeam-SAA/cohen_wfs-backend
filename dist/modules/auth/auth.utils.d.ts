import { Secret } from 'jsonwebtoken';
export declare const createToken: (jwtPayload: Record<string, unknown>, secret: Secret, expiresIn: string) => string;
