export interface UserInterface {
    _id?: string;
    username?: string;    
    email: string;
    password: string;
    role: 'user' | 'administrator' | 'editor';    
}