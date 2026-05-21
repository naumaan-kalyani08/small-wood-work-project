<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            Log::warning('Login failed', ['ip' => $request->ip()]);
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();
        /** @var \App\Models\User $user */
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
        ], 200);
    }

    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'dob' => $request->dob,
            'number' => $request->number,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    /**
     * Logout and revoke the current access token.
     */
    public function logout(Request $request)
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['message' => 'Not authenticated'], 401);
        }

        $current = $user->currentAccessToken();
        if ($current) {
            $current->delete();
        } else {
            if (method_exists($user, 'tokens')) {
                $user->tokens()->delete();
            }
        }

        return response()->json(['message' => 'Logged out'], 200);
    }
}
