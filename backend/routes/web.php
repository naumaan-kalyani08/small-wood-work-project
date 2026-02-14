<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::post('/contact', [App\Http\Controllers\ContactController::class, 'submittedContactForm']);
Route::get('/contact-submissions', [App\Http\Controllers\ContactController::class, 'getContactFormSubmissions']);
