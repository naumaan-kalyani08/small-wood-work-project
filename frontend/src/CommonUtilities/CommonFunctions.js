import { message } from "antd";

const baseUrl = import.meta.env.VITE_APP_API_URL;

export const apiRequest = async ({
    endpoint,
    method = "GET",
    params = {},
    body = null,
    headers = {},
    showMessage = true,
    timeout = 10000
}) => {
    try {
        // Build URL
        const url = new URL(`${baseUrl}${endpoint}`);

        if (method === "GET" && params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== undefined && params[key] !== null) {
                    url.searchParams.append(key, params[key]);
                }
            });
        }

        // Timeout controller
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: method !== "GET" && body ? JSON.stringify(body) : null,
            signal: controller.signal
        });

        clearTimeout(timer);

        let data;
        try {
            data = await response.json();
        } catch {
            data = null;
        }

        if (!response.ok) {
            const errorMessage = data?.message || `Error ${response.status}`;
            if (showMessage) message.error(errorMessage);

            return {
                success: false,
                error: errorMessage,
                status: response.status
            };
        }

        if (showMessage && data?.message) {
            message.success(data.message);
        }

        return {
            success: true,
            data,
            status: response.status
        };

    } catch (error) {
        const errorMessage =
            error.name === "AbortError"
                ? "Request timeout"
                : error.message || "Something went wrong";

        if (showMessage) message.error(errorMessage);

        return {
            success: false,
            error: errorMessage
        };
    }
};