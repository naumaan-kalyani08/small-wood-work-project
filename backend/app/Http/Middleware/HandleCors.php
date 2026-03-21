<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class HandleCors
{
    public function handle(Request $request, Closure $next)
    {
        // STEP 1: Read allowed origins from config/cors.php
        // Uses environment variable if set, otherwise defaults to localhost:5173
        $allowedOrigins = config('cors.allowed_origins', [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
        ]);

        // STEP 2: Get the Origin header from the request
        // This is sent automatically by browsers for cross-origin requests
        $origin = $request->header('Origin');

        // Check if origin is allowed (or if no origin, treat as allowed for development tools like Postman)
        $isAllowed = !$origin || in_array($origin, $allowedOrigins);

        Log::info('CORS Middleware - Request received', [
            'origin' => $origin ?: 'None (same-origin)',
            'path' => $request->path(),
            'method' => $request->method(),
            'is_allowed' => $isAllowed,
        ]);

        // STEP 3: Handle preflight OPTIONS requests
        // Browsers send OPTIONS request BEFORE actual GET/POST
        // This is the "negotiation" step
        if ($request->getMethod() === 'OPTIONS') {
            $response = response('', 204);

            // STEP 4: Only add CORS headers if origin is whitelisted or no origin (Postman, development tools)
            if ($isAllowed) {
                $response->header('Access-Control-Allow-Origin', $origin ?? '*')
                    ->header('Access-Control-Allow-Methods', implode(', ', config('cors.allowed_methods')))
                    ->header('Access-Control-Allow-Headers', implode(', ', config('cors.allowed_headers')))
                    ->header('Access-Control-Allow-Credentials', config('cors.supports_credentials') ? 'true' : 'false')
                    ->header('Access-Control-Max-Age', config('cors.max_age'));
            }

            Log::info('CORS Middleware - Preflight OPTIONS responded');
            return $response;
        }

        // STEP 5: Handle actual requests (GET, POST, etc.)
        $response = $next($request);

        // STEP 6: Add CORS headers if request is allowed
        if ($isAllowed) {
            $response->header('Access-Control-Allow-Origin', $origin ?? '*')
                ->header('Access-Control-Allow-Methods', implode(', ', config('cors.allowed_methods')))
                ->header('Access-Control-Allow-Headers', implode(', ', config('cors.allowed_headers')))
                ->header('Access-Control-Allow-Credentials', config('cors.supports_credentials') ? 'true' : 'false');
        } else {
            Log::warning('CORS Middleware - Request blocked from unauthorized origin', [
                'origin' => $origin,
                'path' => $request->path(),
            ]);
        }
        return $response;
    }
}
