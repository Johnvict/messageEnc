export interface Message {
    recipient: string;
    message: string;
    key: string;
}

export interface UserDetail {
    password: string;
    pin: number;
    securityQuestion: string;
    email: string;
}