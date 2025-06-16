export interface LoginRequest {
    userName: string;
    password: string;
    ipAddress: string;
};

export interface RegistrationRequest {
    userName: string;
    mobileNumber: string;
    referralCode: string;
    password: string;
    fullName: string;
};