<?php

namespace App\Http\Controllers;

use App\Models\PersonalInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PersonalInformationController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:sanctum')->except(['index', 'show']);
    // }

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
            'images' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $imagePath = null;
        if ($request->hasFile('images')) {
            $image = $request->file('images');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $imagePath = 'images/' . $imageName;
        }

        $personalInformation = PersonalInformation::create(array_merge($request->all(), ['images' => $imagePath]));
        return response()->json($personalInformation, 201);
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
            'email' => 'email' ,
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Handle image update
       
        // Update personal information fields
        $personalInformation->first_name = $request->input('first_name');
        $personalInformation->last_name = $request->input('last_name');
        $personalInformation->email = $request->input('email');

        $personalInformation->save();

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
