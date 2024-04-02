<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExperienceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index()
    {
        $experiences = Experience::all();
        return response()->json($experiences);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'company' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $experience = Experience::create($request->all());
        return response()->json($experience, 201);
    }

    public function show($id)
    {
        $experience = Experience::find($id);
        if (!$experience) {
            return response()->json(['message' => 'Experience not found'], 404);
        }
        return response()->json($experience);
    }

    public function update(Request $request, $id)
    {
        $experience = Experience::find($id);
        if (!$experience) {
            return response()->json(['message' => 'Experience not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'string',
            'company' => 'string',
            'start_date' => 'date',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $experience->update($request->all());
        return response()->json($experience, 200);
    }

    public function destroy($id)
    {
        $experience = Experience::find($id);
        if (!$experience) {
            return response()->json(['message' => 'Experience not found'], 404);
        }
        $experience->delete();
        return response()->json(['message' => 'Experience deleted successfully']);
    }
}
