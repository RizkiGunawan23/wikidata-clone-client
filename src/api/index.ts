import axios from "axios";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";
import type { SignInResponse } from "../features/auth/types";

const API_CONFIG = {
    baseURL:
        import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
};

export const apiClient = axios.create(API_CONFIG);

const PUBLIC_ENDPOINTS = ["/user/auth/signin", "/user/auth/signup"];

apiClient.interceptors.request.use(
    (config) => {
        const token = getCookie("accessToken");

        const isPublicEndpoint = PUBLIC_ENDPOINTS.some(
            (endpoint) => config.url === endpoint,
        );

        if (token && config.headers && !isPublicEndpoint) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = getCookie("refreshToken");
                if (refreshToken) {
                    const refreshResponse = await axios.post(
                        `${API_CONFIG.baseURL}/user/auth/refresh`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${refreshToken}`,
                            },
                        },
                    );

                    const accessToken = (
                        refreshResponse.data as ApiResponse<SignInResponse>
                    ).data.data.tokens.accessToken;

                    setCookie("accessToken", accessToken);

                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    }
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
                removeCookie("auth");
                removeCookie("accessToken");
                removeCookie("refreshToken");

                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
            }
        }

        return Promise.reject(error);
    },
);

export interface ApiResponse<T = unknown> {
    message: string;
    data: T;
}

interface RequestConfig {
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
    timeout?: number;
}

export const api = {
    get: async <T = unknown>(
        url: string,
        config?: RequestConfig,
    ): Promise<ApiResponse<T>> => {
        const response = await apiClient.get<ApiResponse<T>>(url, config);
        return response.data;
    },

    post: async <T = unknown>(
        url: string,
        data?: unknown,
        config?: RequestConfig,
    ): Promise<ApiResponse<T>> => {
        const response = await apiClient.post<ApiResponse<T>>(
            url,
            data,
            config,
        );
        return response.data;
    },

    put: async <T = unknown>(
        url: string,
        data?: unknown,
        config?: RequestConfig,
    ): Promise<ApiResponse<T>> => {
        const response = await apiClient.put<ApiResponse<T>>(url, data, config);
        return response.data;
    },

    patch: async <T = unknown>(
        url: string,
        data?: unknown,
        config?: RequestConfig,
    ): Promise<ApiResponse<T>> => {
        const response = await apiClient.patch<ApiResponse<T>>(
            url,
            data,
            config,
        );
        return response.data;
    },

    delete: async <T = unknown>(
        url: string,
        config?: RequestConfig,
    ): Promise<ApiResponse<T>> => {
        const response = await apiClient.delete<ApiResponse<T>>(url, config);
        return response.data;
    },
};

export type ApiError = {
    message: string;
    errors: {
        [key: string]: string[];
    };
};
