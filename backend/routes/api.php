<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

Route::post('/contact', [ContactController::class, 'submittedContactForm']);
Route::get('/contact-submissions', [ContactController::class, 'getContactFormSubmissions']);
