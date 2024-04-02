<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;
    protected $collection = 'experiences';

    protected $fillable = [
        'title',
        'company',
        'start_date',
        'end_date',
    ];
}
