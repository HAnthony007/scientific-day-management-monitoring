<?php

namespace App\Http\Controllers;

use App\Models\Response;
use Illuminate\Http\Request;
use Validator;

class ResponseController extends Controller
{
    public function index(){
        return response()->json(Response::all(),201);
    }
    public function show($id){
        $response=Response::find($id);

        if (!$response){
            return response()->json(['message'=>"Cours non trouver"],404);
        }
        return response()->json($response,201);
    }
    //
    public function store(Request $request){
        $validator=Validator::make($request->all(),[
            'value'=>'required|max:255',
            'isTrue'=>'required|numeric|max:1',
            'quest_id'=>'required|numeric'
        ]);
        
        if ($validator->fails()){
            return response()->json(['message'=>$validator->errors()],400);
        }

        try {
            Response::create([
                'value'=>$request->value,
                'isTrue'=>$request->isTrue,
                'quest_id'=>$request->quest_id,
            ]);
            return response()->json(['message'=>'Enregistrement effectué'],201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create user: ' . $e->getMessage()], 500);
        }

    }

    public function update($id,Request $request){
        $validator=Validator::make($request->all(),[
            'value'=>'required|max:255',
            'isTrue'=>'required|numeric|max:1',
            'quest_id'=>'required|numeric'
        ]);

        if ($validator->fails()){
            return response()->json(['message'=>$validator->errors()],400);
        }

        $response=Response::find($id);
        if (!$response){
            return response()->json(['message'=>"Cours non trouver"],404);
        }
        $response->update($validator->valid());
        return response()->json(["message"=>"Modification effectuer"],200);
    }

    public function destroy($id){
        $response=Response::find($id);

        if (!$response){
            return response()->json(['message'=>"Cours non trouver"],404);
        }

        $response->delete();

        return response()->json(["message"=>"Suppression effectuer"],200);

    }
}
