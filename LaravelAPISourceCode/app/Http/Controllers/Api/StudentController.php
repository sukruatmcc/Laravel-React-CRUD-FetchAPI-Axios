<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::orderBy('created_at')->get();

        return response()->json([
            'message' => true,
            'students' => $students,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|min:3',
            'course' => 'required|min:3',
            'phone' => 'required|min:3'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ],422);
        }
        else{
        $student = Student::create([
            'name' => $request->name,
            'course' => $request->course,
            'phone' => $request->phone,
        ]);

        return response()->json([
            'message' => 'Your transaction was completed successfully',
            'data' => $student
            ]);
        }
    }

    public function edit($id)
    {
        $student = Student::findOrFail($id);

        return response()->json([
            'message' => 'Succesfully',
            'data' => $student
        ]);
    }

    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        $student->update([
            'name' => $request->input('name'),
            'course' => $request->input('course'),
            'phone' => $request->input('phone'),
    ]);

        return response()->json(['message' => 'Your transaction was completed successfully', 'data' => $student], 200);
    }

    public function delete($id)
    {
         $student = Student::find($id)->delete();

        return response()->json(['message' => 'Your transaction was completed successfully', 'data' => $student], 200);
    }
}