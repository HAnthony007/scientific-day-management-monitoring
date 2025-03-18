<?php

namespace App\Http\Controllers;

use App\Models\User;
// use Hash;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
// use Validator;

class AuthController extends Controller
{


    public function login(Request $request){
        $credentials=$request->only('email','password');
        try{
            if (!$token=JWTAuth::attempt($credentials)){
                return response()->json([
                    'data'=>null,
                    'msg'=>'Mdp ou email faux'
                ],401);
            }
        }
        catch(JWTException $e){
            return response()->json([
            'data'=>null,
            'msg'=>'Acces token fails']
            ,401);
        }
        

        $user = JWTAuth::user();

        return response()->json([
            'data' => $token,
            'msg'=>"Connexion effectué"
        ]);
    }

    public function register(Request $request){
        $validator=Validator::make($request->all(),[
            'name'=>'required|max:255',
            'email'=>'required|email|max:255|unique:users',
            // 'role'=>'required|max:255',
            // 'level'=>'required|max:1000',
            // 'phoneNumber'=>'required|digits:10|numeric',
            // 'photo'=>'mimes:jpeg,jpg|max:20971',
            'password'=>'required|max:255'
        ]);

        if ($validator->fails()){
            return response()->json([
                "data"=>$validator->errors(),
                "msg"=>null,
            ],422);
        }

        try {
            // $file=$request->file('user_photo');
            // $file->move(public_path('user_photo'),$file->getClientOriginalName());
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                // 'role' => $request->role,
                // 'level' => $request->level,
                // 'phoneNumber' => $request->phoneNumber,
                // 'photo' => 'user_photo/'.$file->getClientOriginalName(),
                'password' => Hash::make($request->password)
            ]);
    
            return response()->json([
                'data'=>null,
                'msg' => 'User created'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'data'=>$e->getMessage(),
                'msg' => 'Failed to create user '
            ], 500);
        }
    }
}
