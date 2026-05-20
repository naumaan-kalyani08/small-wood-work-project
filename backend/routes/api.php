<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:60,1')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

// Stricter rate limit for contact submissions to mitigate spam
Route::post('/contact', [ContactController::class, 'submittedContactForm'])->middleware('throttle:5,1');

Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    Route::get('/contact-submissions', [ContactController::class, 'getContactFormSubmissions']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
