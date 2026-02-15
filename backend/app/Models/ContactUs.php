<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactUs extends Model
{
    protected $table = 'contact_form_data';
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'description',
    ];
}
