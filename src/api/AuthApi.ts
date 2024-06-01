import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { CheckPasswordForm, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, userSchema } from "../types";

export async function registerUser(body : UserRegistrationForm) {
    try {
        const url = '/auth/create-account';
        const { data } = await api.post<string>(url, body);
        return data;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.error);
        }
    }
}

export async function authenticateUser(formData : UserLoginForm) {
    try {
        const url = '/auth/login';
        const { data } = await api.post<string>(url, formData);
        localStorage.setItem('AUTH_TOKEN', data);
        return data;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.error);
        }
    }
}

export async function forgotPassword(formData : ForgotPasswordForm) {
    try {
        const url = '/auth/forgot-password';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.error);
        }
    }
}

export async function validateToken(formData : ConfirmToken) {
    try {
        const url = '/auth/validate-token';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.error);
        }
    }
}

export async function updatePassword({ formData, token } : {formData : NewPasswordForm, token : ConfirmToken['token']}) {
    try {
        const url = `/auth/update-password/${token}`;
        console.log(token)
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.error);
        }
    }
}

export async function confirmAccount(token : ConfirmToken['token']) {
    try {
        const url = '/auth/confirm-account';
        const { data } = await api.post<string>(url, { token });
        return data;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.error);
        }
    }
}

export async function requestConfirmationCode(email : RequestConfirmationCodeForm) {
    try {
        const url = '/auth/request-code';
        const { data } = await api.post<string>(url, email);
        return data;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.error);
        }
    }
}

export async function getUser() {
    try {
        const url = '/auth/user';
        const { data } = await api.get(url);
        const response = userSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.error);
        }
    }
}

export async function checkPassword(formData : CheckPasswordForm) {
    try {
        const url = '/auth/check-password';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            throw new Error(err.response.data.error);
        }
    }
}