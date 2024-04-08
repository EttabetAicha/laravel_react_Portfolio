<?php

namespace App\Http\Controllers;

use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EducationController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:sanctum')->except(['index', 'show']);
    // }

    public function index()
    {
        $educations = Education::all();
        return response()->json($educations);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'degree' => 'required|string',
            'institution' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $education = Education::create($request->all());
        return response()->json($education, 201);
    }

    public function show($id)
    {
        $education = Education::find($id);
        if (!$education) {
            return response()->json(['message' => 'Education not found'], 404);
        }
        return response()->json($education);
    }

    public function update(Request $request, $id)
    {
        $education = Education::find($id);
        if (!$education) {
            return response()->json(['message' => 'Education not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'degree' => 'string',
            'institution' => 'string',
            'start_date' => 'date',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $education->update($request->all());
        return response()->json($education, 200);
    }

    public function destroy($id)
    {
        $education = Education::find($id);
        if (!$education) {
            return response()->json(['message' => 'Education not found'], 404);
        }
        $education->delete();
        return response()->json(['message' => 'Education deleted successfully']);
    }
}
