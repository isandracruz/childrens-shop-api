export interface UserInterface {
    _id?: string;
    name?: string;    
    email: string;
    password: string;
    role: 'user' | 'administrator' | 'editor';    
}