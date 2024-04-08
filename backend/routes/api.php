<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonalInformationController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::resource('users',UserController::class);
// Route::resource('personal-information',PersonalInformationController::class);
// Define individual routes for personal information CRUD operations
Route::get('/personal-information', [PersonalInformationController::class, 'index']);
Route::post('/personal-information', [PersonalInformationController::class, 'store']);
Route::get('/personal-information/{id}', [PersonalInformationController::class, 'show']);
Route::put('/personal-information/{id}', [PersonalInformationController::class, 'update']);
Route::delete('/personal-information/{id}', [PersonalInformationController::class, 'destroy']);


//foreducations
Route::get('/educations', [EducationController::class, 'index']);
Route::post('/educations', [EducationController::class, 'store']);
Route::get('/educations/{id}', [EducationController::class, 'show']);
Route::put('/educations/{id}', [EducationController::class, 'update']);
Route::delete('/educations/{id}', [EducationController::class, 'destroy']);


// Route::middleware('auth:sanctum')->apiResource('personal-information', PersonalInformationController::class);

// Route::middleware('auth:sanctum')->apiResource('education', EducationController::class);

Route::middleware('auth:sanctum')->apiResource('experience', ExperienceController::class);
