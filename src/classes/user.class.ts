import { UserInterface } from "../interfaces/user.interface";
import bcrypt from "bcrypt";

export class UserClass implements UserInterface {
    _id?: string;
    username?: string;    
    email: string;
    password: string;
    role: 'user' | 'administrator' | 'editor';

    constructor(newUser: UserInterface) {
        this.username = newUser.username;
        this.email = newUser.email;
        this.password = bcrypt.hashSync(newUser.password, 10),
        this.role = newUser.role;
    }
}