<?php

/**
 * CORS Configuration
 * 
 * This controls which domains can access your API.
 * Use environment variables for different configurations per environment.
 */

return [
    /**
     * Paths that CORS should be applied to
     * Example: api/* means all /api/* routes
     */
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    /**
     * Allowed HTTP Methods
     * Which HTTP verbs are allowed from cross-origin requests
     */
    'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

    /**
     * ALLOWED ORIGINS - WHITELIST APPROACH
     * 
     * ⚠️ CRITICAL FOR SECURITY:
     * 1. DEVELOPMENT: Use localhost only
     * 2. PRODUCTION: Use only your actual domain
     * 3. NEVER use wildcard '*' in production
     * 
     * Read from .env file for environment-specific values
     */
    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173')),

    /**
     * Regex patterns for origins (advanced)
     * Use for subdomains: '*.yourdomain.com'
     */
    'allowed_origins_patterns' => [
        // Example for production with subdomains:
        // env('APP_ENV') === 'production' ? '/.*\.yourdomain\.com/' : null,
    ],

    /**
     * Allowed Request Headers
     * What headers can be sent from the frontend to backend
     */
    'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],

    /**
     * Headers exposed to frontend
     * Frontend JavaScript can read these response headers
     */
    'exposed_headers' => ['Content-Length', 'X-Total-Count', 'X-Page-Number'],

    /**
     * Max Age (preflight caching)
     * How long browser caches preflight OPTIONS response (seconds)
     * Set to 0 for no cache (safe for development)
     * Set to 86400 for production (24 hours)
     */
    'max_age' => env('APP_ENV') === 'production' ? 86400 : 0,

    /**
     * Credentials Mode
     * Whether to allow cookies and authorization headers in cross-origin requests
     * Set to true if your API uses sessions or auth tokens
     */
    'supports_credentials' => false,
];
