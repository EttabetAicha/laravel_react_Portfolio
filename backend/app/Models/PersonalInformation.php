<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class PersonalInformation extends Model
{
    use HasFactory;
    protected $collection = 'personal_information';

    protected $fillable = [
        'image',
        'first_name',
        'last_name',
        'email',
    ];

}
