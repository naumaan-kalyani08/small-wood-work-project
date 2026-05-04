<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Models\ContactUs;

class ContactController extends Controller
{
    public function submittedContactForm(ContactFormRequest $request)
    {
        $validated = $request->validated();
        ContactUs::create($validated);

        return response()->json(['message' => 'Contact form submitted successfully'], 201);
    }

    public function getContactFormSubmissions()
    {
        $submissions = ContactUs::all();

        return response()->json([
            'data' => $submissions,
            'message' => 'Contact form submissions retrieved successfully',
        ]);
    }
}
