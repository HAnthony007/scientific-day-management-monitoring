<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;

class UserController extends Controller
{
    public function allUser(Request $request){
        $users=User::all();
        return response()->json([
            'data'=>$users,
            'msg'=>null
        ],201);
    }

    public function index(Request $request){
        $user=User::find($request->get('id'));
        return response()->json([
            'data'=>$user,
            'msg'=>null
        ],201);
    }

    // public function userConnecter(Request $request){
    //     $user = $request->get("user");
    //     return response()->json([
    //         'user'=>[
    //             'lastName' => $user->name,
    //             'email' => $user->email,
    //             'role' => $user->role,
    //         ]
    //     ]);
    // }

    public function update(Request $request){
        $validator=Validator::make($request->all(),[
            'email'=>"required|max:255",
            'lastName'=>'required|max:255',
            'firstName'=>'required|max:255',
            'photo'=>'mimes:jpeg,jpg|max:20971',
            'password'=>'required|max:255'
        ]);
        if ($validator->fails()){
            return response()->json([
                'data'=>$validator->errors(),
                "msg"=>'Erreur de champs'
            ],422);
        }
        $user=User::find($request->get("id"));
        $user->update($validator->valid());
        if ($request->hasFile('user_photo')){
            $file = $request->file('user_photo');
            $filePath = 'user_photo/' . $request->get("id");
            $file->move(public_path('user_photo/'), $file->getClientOriginalName());
            $user->photo=$filePath;
        }
        $user->save();
        return response()->json([
            "msg"=>"Modification effectuer",
            'data'=>null
        ],200);
    }

    public function updatePts(Request $request){
        $validator=Validator::make($request->all(),[
            'points'=>"nullable|numeric"
        ]);
        if ($validator->fails()){
            return response()->json([
                'data'=>$validator->errors(),
                "msg"=>'Erreur de champs'
            ],422);
        }
        $user=User::find($request->get("id"));
        $user->points+=$request->points;
        $user->save();

        return response()->json([
            'data'=>null,
            "msg"=>"Vous avez reçus ".$request->points."pts"
        ],201);
    }

    public function updateLvl(Request $request){
        $validator=Validator::make($request->all(),[
            'level'=>"nullable|numeric"
        ]);
        if ($validator->fails()){
            return response()->json([
                'data'=>$validator->errors(),
                "msg"=>'Erreur de champs'
            ],422);
        }
        $user=User::find($request->get("id"));
        $user->level+=$request->level;
        $user->save();

        return response()->json(["msg"=>$request->level<0? "Votre niveau a diminué de ".$request->level:"Votre niveau a augmenté de ".$request->level],201);
    }

}
