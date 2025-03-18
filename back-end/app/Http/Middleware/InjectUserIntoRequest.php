<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class InjectUserIntoRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = JWTAuth::user();

        // Si l'utilisateur est connecté, ajoute l'utilisateur ou son ID dans la requête
        if (!$user) {
            return response()->json([
                'data'=>null,
                "msg"=>"Veuillez vous connectez"
            ],404);
        }
        // Ajouter l'utilisateur complet à la requête
        $request->attributes->add(['user' => $user]);
        // Ajouter juste l'ID de l'utilisateur à la requête
        $request->attributes->add(['id' => $user->id]);
        return $next($request);
    }
}
