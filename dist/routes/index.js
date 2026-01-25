import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.router.js';
import { AuthRoutes } from '../modules/auth/auth.router.js';
import { ContactRoutes } from '../modules/contact/contact.router.js';
import { EnquiryRoutes } from '../modules/enquiry/enquiry.router.js';
const router = Router();
const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/contact',
        route: ContactRoutes
    }, {
        path: '/enquiry',
        route: EnquiryRoutes
    }
];
router.get('/test', (req, res) => {
    res.json({ message: "Router is connected!" });
});
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
//# sourceMappingURL=index.js.map