<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;

abstract class Controller
{
    public function submittedContactForm(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'description' => 'required|string',
            'email' => 'required_without:phone|email',
            'phone' => 'required_without:email',
        ]);

        $response = ContactUs::create($validated);

        return response()->json([
            'message' => 'Contact form submitted successfully',
            'data' => $response
        ], 201);
    }
    public function getContactFormSubmissions()
    {
        $submissions = ContactUs::all();

        return response()->json([
            'message' => 'Contact form submissions retrieved successfully',
            'data' => $submissions
        ], 200);
    }
}
