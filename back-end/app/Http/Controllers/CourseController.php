<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Validator;

class CourseController extends Controller
{
    public function index(){
        return response()->json(Course::all(),201);
    }
    public function store(Request $request){
        $validator=Validator::make($request->all(),[
            'title'=>'required|max:50',
            'description'=>'required|max:255',
            'language'=>'required|max:255',
            'category'=>'required|max:255',
            'status'=>'required|max:255'
        ]);

        if ($validator->fails()){
            return response()->json(['msg'=>$validator->errors()],400);
        }

        try {
            Course::create([
                'title'=>$request->title,
                'description'=>$request->description,
                'language'=>$request->language,
                'category'=>$request->category,
                'status'=>$request->status,

            ]);

            return response()->json(['msg'=>'Enregistrement effectué'],201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create user: ' . $e->getMessage()], 500);

        }

    }

    public function update($id,Request $request){
        $validator=Validator::make($request->all(),[
            'title'=>'required|max:50',
            'description'=>'required|max:255',
            'language'=>'required|max:255',
            'category'=>'required|max:255',
            'status'=>'required|max:255'
        ]);

        if ($validator->fails()){
            return response()->json([
                'data'=>$validator->errors(),
                'msg'=>"Erreur de Formulaire",
            ],422);
        }

        $course=Course::find($id);
        if (!$course){
            return response()->json(['msg'=>"Cours non trouver"],404);
        }
        $course->update($validator->valid());
        return response()->json(["message"=>"Modification effectuer"],200);
    }

    public function show($id){
        $course=Course::find($id);

        if (!$course){
            return response()->json(['msg'=>"Cours non trouver"],404);
        }
        return response()->json($course,201);
    }

    public function destroy($id){
        $course=Course::find($id);

        if (!$course){
            return response()->json(['msg'=>"Cours non trouver"],404);
        }

        $course->delete();

        return response()->json(["message"=>"Suppression effectuer"],200);

    }

    public function showChapter($id){
        $course=Course::find($id);
        if (!$course){
            return response()->json(['msg'=>"Cours non trouver"],404);
        }

        return response()->json($course->chapters,201);
    }

}
