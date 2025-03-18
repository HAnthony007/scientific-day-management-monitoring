<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Validator;

class UserCoursController extends Controller
{
    public function index(Request $request){
        $user=User::find($request->get('id'));
        return response()->json([$user->cours],201);
    }

    public function store(Request $request){
        $validator=Validator::make($request->all(),[
            'cours_id'=>'required|numeric'
        ]);

        if ($validator->fails()){
            return response(["message"=>"Aucun cours séléctionnez"],404);
        }

        try {
            $user=User::find($request->get('id'));
            $user->cours()->attach($request->cours_id);
            return response(["message"=>"Enregistrement effectué"],200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create user: ' . $e->getMessage()], 500);
        }
    }

    public function show($id,Request $request){
        $user=User::find($request->get('id'));

        return response()->json([$user->cours()->find($id)]);
    }

    public function destroy($id,Request $request){
        $user=User::find($request->get('id'));
        $user->cours()->detach($id);
    }
}
