<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Education extends Model
{
    use HasFactory;
    protected $collection = 'education';

    protected $fillable = [
        'degree',
        'institution',
        'start_date',
        'end_date',
    ];
}
