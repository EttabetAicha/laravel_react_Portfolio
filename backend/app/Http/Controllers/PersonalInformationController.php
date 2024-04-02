<?php
namespace App\Http\Controllers;

use App\Models\PersonalInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PersonalInformationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index()
    {
        $personalInformation = PersonalInformation::all();
        return response()->json($personalInformation);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:personal_information',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $personalInformation = PersonalInformation::create($request->all());
        return response()->json($personalInformation, 201);
    }

    public function show($id)
    {
        $personalInformation = PersonalInformation::find($id);
        if (!$personalInformation) {
            return response()->json(['message' => 'Personal information not found'], 404);
        }
        return response()->json($personalInformation);
    }

    public function update(Request $request, $id)
    {
        $personalInformation = PersonalInformation::find($id);
        if (!$personalInformation) {
            return response()->json(['message' => 'Personal information not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'first_name' => 'string',
            'last_name' => 'string',
            'email' => 'email|unique:personal_information,email,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $personalInformation->update($request->all());
        return response()->json($personalInformation, 200);
    }

    public function destroy($id)
    {
        $personalInformation = PersonalInformation::find($id);
        if (!$personalInformation) {
            return response()->json(['message' => 'Personal information not found'], 404);
        }
        $personalInformation->delete();
        return response()->json(['message' => 'Personal information deleted successfully']);
    }
}
