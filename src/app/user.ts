export interface User {
    _id: string;
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
}