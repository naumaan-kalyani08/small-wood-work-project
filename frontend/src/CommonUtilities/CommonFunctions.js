import { message } from "antd";

const baseUrl = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api';

const normalizeEndpoint = (endpoint) => {
    if (!endpoint) return '';
    return endpoint.replace(/^\/+/, '');
};

export const apiRequest = async ({
    endpoint,
    method = "GET",
    params = {},
    body = null,
    headers = {},
    showMessage = true,
    timeout = 10000
}) => {
    const normalizedEndpoint = normalizeEndpoint(endpoint);
    try {
        // Build URL
        const url = new URL(`${baseUrl.replace(/\/$/, '')}/${normalizedEndpoint}`);

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

export const GetCommonFunction = async (endpoint, params = {}, showMessage = true) => {
    return apiRequest({ endpoint, method: 'GET', params, showMessage });
};