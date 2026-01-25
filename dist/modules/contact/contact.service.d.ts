import { TContact } from "./contact.interface.js";
export declare const ContactService: {
    createContact: (payload: TContact) => Promise<import("mongoose").Document<unknown, {}, TContact, {}, import("mongoose").DefaultSchemaOptions> & TContact & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
};
