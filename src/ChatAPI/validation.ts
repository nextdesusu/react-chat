export interface validationResult {
    isValid: boolean;
    error?: string;
}

export type vfType = (arg: string) => validationResult

export function validateUserName(userName: string): validationResult {
    return {
        isValid: userName.length > 3,
        error: "User name have to be at least 4 characters",
    }
}

export function validateChannel(channel: string): validationResult {
    return {
        isValid: channel.length > 3,
        error: "Channel should have at least 4 characters",
    }
}