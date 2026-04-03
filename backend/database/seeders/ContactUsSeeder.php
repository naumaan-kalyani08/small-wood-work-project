<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContactUsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('contact_form_data')->insert([
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'full_name' => 'John Doe',
                'phone_number' => '123-456-7890',
                'email' => 'john.doe@example.com',
                'message' => 'This is a test message.'
            ],
            [
                'first_name' => 'Jane',
                'last_name' => 'Smith',
                'full_name' => 'Jane Smith',
                'phone_number' => '098-765-4321',
                'email' => 'jane.smith@example.com',
                'message' => 'This is another test message.'
            ]
        ]);
    }
}
