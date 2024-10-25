import { Gender } from "../gender.model";

export class User {
    id: number;
    account: string;
    password: string;
    name: string;
    phone: string;
    email: string;
    dob: Date | string;
    groups: string[];
    validTo: Date;
    blocked: boolean;
    avatarUrl: string;
    gender: Gender;

    public constructor(user: Partial<User> = {}) {
        Object.assign(this, user);
    }
}