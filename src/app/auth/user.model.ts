
export class User {
    id: number;
    account: string;
    password: string;
    name: string;
    phone: string;
    email: string;
    dob: Date;
    groups: string[];


    public constructor(user: Partial<User> = {}) {
        Object.assign(this, user);
    }
}