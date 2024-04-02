<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'articles';
    protected $fillable = [
        'name', 'detail'
    ];
}
