import { TContact } from './contact.interface.js';
export declare const Contact: import("mongoose").Model<TContact, {}, {}, {}, import("mongoose").Document<unknown, {}, TContact, {}, import("mongoose").DefaultSchemaOptions> & TContact & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, TContact>;
