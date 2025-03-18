<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Validator;

class QuestionController extends Controller
{
    public function index(){
        return response()->json(Question::all(),201);
    }
    public function show($id){
        $question=Question::find($id);

        if (!$question){
            return response()->json(['message'=>"Cours non trouver"],404);
        }
        return response()->json($question,201);
    }
    //
    public function store(Request $request){
        $validator=Validator::make($request->all(),[
            'description'=>'required|max:255',
            'type'=>'required|max:255',
            'points'=>'required|numeric',
            'chpt_id'=>'required|numeric'
        ]);
        
        if ($validator->fails()){
            return response()->json(['message'=>$validator->errors()],400);
        }

        try {
            Question::create([
                'description'=>$request->description,
                'type'=>$request->type,
                'points'=>$request->points,
                'chpt_id'=>$request->chpt_id,
            ]);
            return response()->json(['message'=>'Enregistrement effectué'],201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create user: ' . $e->getMessage()], 500);
        }

    }

    public function update($id,Request $request){
        $validator=Validator::make($request->all(),[
            'description'=>'required|max:255',
            'type'=>'required|max:255',
            'points'=>'required|numeric',
            'chpt_id'=>'required|numeric'
        ]);

        if ($validator->fails()){
            return response()->json(['message'=>$validator->errors()],400);
        }

        $question=Question::find($id);
        if (!$question){
            return response()->json(['message'=>"Cours non trouver"],404);
        }
        $question->update($validator->valid());
        return response()->json(["message"=>"Modification effectuer"],200);
    }

    public function destroy($id){
        $question=Question::find($id);

        if (!$question){
            return response()->json(['message'=>"Cours non trouver"],404);
        }

        $question->delete();

        return response()->json(["message"=>"Suppression effectuer"],200);

    }

    public function showResp($id){
        $question=Question::find($id);
        if (!$question){
            return response()->json(['message'=>"Cours non trouver"],404);
        }

        return response()->json($question->response,201);
    }
}
