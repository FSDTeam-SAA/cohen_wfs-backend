export const USER_ROLE = {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
} as const;

export type TUserRole = keyof typeof USER_ROLE;