<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function submittedContactForm(Request $request)
    {
        Log::info('function triggered');
        // Add your contact form submission logic here
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'full_name' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        ContactUs::create($validated);

        return response()->json(['message' => 'Contact form submitted successfully'], 201);
    }

    public function getContactFormSubmissions()
    {
        // Retrieve all contact form submissions
        $submissions = ContactUs::all();
        return response()->json([
            'data' => $submissions, 
            'message' => 'Contact form submissions retrieved successfully'
        ]);
    }
}
