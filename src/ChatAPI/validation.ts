export interface validationResult {
    isValid: boolean;
    error?: string;
}

export type vfType = (arg: string) => validationResult

export function validateUserName(userName: string): validationResult {
    return {
        isValid: userName.length > 0,
        error: "",
    }
}

export function validateChannel(channel: string): validationResult {
    return {
        isValid: channel.length > 0,
        error: "",
    }
}