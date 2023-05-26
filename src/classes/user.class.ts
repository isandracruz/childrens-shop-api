import { UserInterface } from "../interfaces/user.interface";
export class UserClass implements UserInterface {
    _id?: string;
    name?: string;    
    email: string;
    password: string;
    role: 'user' | 'administrator' | 'editor';

    constructor(newUser: UserInterface) {
        this.email = newUser.email;
        this.password = newUser.password;
        this.role = newUser.role;
    }
}