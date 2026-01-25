import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface.js';
declare const Auth: (...requiredRoles: TUserRole[]) => (req: Request, res: Response, next: NextFunction) => void;
export default Auth;
