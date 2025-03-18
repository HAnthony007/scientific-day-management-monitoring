<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function allUser(Request $request)
    {
        $user = auth()->user();

        $users = User::where('id_user', '!=', $user->id_user)->get();

        return response()->json([
            'data' => $users,
            'msg' => null
        ], 200);
    }

    public function me(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'data' => null,
                'msg' => 'Utilisateur non authentifié'
            ], 401);
        }
    
        return response()->json([
            'data' => $user,
            'msg' => null
        ], 200);
    }

    public function destroy($id) {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'data' => null,
                'msg' => 'Utilisateur introuvable'
            ], 404);
        }
    
        $user->delete();
    
        return response()->json([
                'data' => null,
            'msg' => 'Utilisateur supprimé avec succès'
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

    if (!$user) {
        return response()->json([
                'data' => null,
            'msg' => 'Utilisateur introuvable'
        ], 404);
    }

   // Création du validateur
   $validator = Validator::make($request->all(), [
    'name' => 'sometimes|string|max:255',
    'email' => 'sometimes|email|unique:users,email,' . $id . ',id_user',
    'role' => 'sometimes|in:admin,organisateur,participant',
    'status' => 'sometimes|in:active,inactive,invited,suspended',
]);

// Vérification si la validation échoue
if ($validator->fails()) {
    return response()->json([
        'data' => $validator->errors(),
        "msg" => 'Erreur de champs'
    ], 422);
}

    // Mise à jour des champs fournis
    $user->update($validator->validated());

    return response()->json([
        'msg' => 'Utilisateur mis à jour avec succès',
        'data' => $user
    ], 200);
        // $validator = Validator::make($request->all(), [
        //     'email' => "required|max:255",
        //     'lastName' => 'required|max:255',
        //     'firstName' => 'required|max:255',
        //     'photo' => 'mimes:jpeg,jpg|max:20971',
        //     'password' => 'required|max:255'
        // ]);
        // if ($validator->fails()) {
        //     return response()->json([
        //         'data' => $validator->errors(),
        //         "msg" => 'Erreur de champs'
        //     ], 422);
        // }
        // $user = User::find($request->get("id"));
        // $user->update($validator->valid());
        // $user->save();
        // return response()->json([
        //     "msg" => "Modification effectuer",
        //     'data' => null
        // ], 200);
        // if ($request->hasFile('user_photo')) {
        //     $file = $request->file('user_photo');
        //     $filePath = 'user_photo/' . $request->get("id");
        //     $file->move(public_path('user_photo/'), $file->getClientOriginalName());
        //     $user->photo = $filePath;
        // }
    }

    public function updatePts(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'points' => "nullable|numeric"
        ]);
        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                "msg" => 'Erreur de champs'
            ], 422);
        }
        $user = User::find($request->get("id"));
        $user->points += $request->points;
        $user->save();

        return response()->json([
            'data' => null,
            "msg" => "Vous avez reçus " . $request->points . "pts"
        ], 201);
    }

    public function updateLvl(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'level' => "nullable|numeric"
        ]);
        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                "msg" => 'Erreur de champs'
            ], 422);
        }
        $user = User::find($request->get("id"));
        $user->level += $request->level;
        $user->save();

        return response()->json(["msg" => $request->level < 0 ? "Votre niveau a diminué de " . $request->level : "Votre niveau a augmenté de " . $request->level], 201);
    }
}
