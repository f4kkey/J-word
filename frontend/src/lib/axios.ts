import axios from "axios";
import type {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios";

export const axiosInstance: AxiosInstance = axios.create({
    baseURL:
        import.meta.env.MODE === "development"
            ? "http://localhost:8080/api/v1"
            : "/api/v1",
    withCredentials: true,
});

declare module "axios" {
    export interface InternalAxiosRequestConfig {
        _retry?: boolean;
    }
}

interface FailedRequest {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (
    error: unknown,
    token: string | null = null
): void => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });

    failedQueue = [];
};

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig;

        if (
            error.response?.status === 401 &&
            originalRequest.url !== "/auth/refresh" &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => axiosInstance(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await axiosInstance.post("/auth/refresh");
                processQueue(null);
                return axiosInstance(originalRequest);
            } catch (err) {
                processQueue(err);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);