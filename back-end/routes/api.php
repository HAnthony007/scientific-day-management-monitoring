<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CoursController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserCoursController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/login',[AuthController::class,'login']);
Route::post('/register',[AuthController::class,'register']);

// Route::post('/register',[AuthController::class,'register']);

Route::middleware(['auth:api', 'inject.user'])->group(function(){
    Route::apiResource('User',UserController::class)->except(['create','edit']);
    Route::prefix('/User/')->controller(UserController::class)->group(function(){
        Route::get('listeUser','allUser');
        // Route::get('userConnecter','userConnecter');
        Route::post("updatePts","updatePts");
        Route::post("updateLvl","updateLvl");
    });
    Route::apiResource('Course',CourseController::class)->except(['create','edit']);
    Route::prefix('/Course/')->controller(CourseController::class)->group(function(){
        Route::get('selected/{id}','showChapter')->where([
            'id'=>"\d+"
        ]);
    });
    Route::apiResource('Chapter',ChapterController::class)->except(['create','edit']);
    Route::prefix('/Chapter/')->controller(ChapterController::class)->group(function(){
        Route::get('selected/{id}','showQuestion')->where([
            'id'=>"\d+"
        ]);
    });
    Route::apiResource('Question',QuestionController::class)->except(['create','edit']);
    Route::prefix('/Question/')->controller(QuestionController::class)->group(function(){
        Route::get('selected/{id}','showResp')->where([
            'id'=>"\d+"
        ]);
    });
    Route::apiResource('Response',ResponseController::class)->except(['create','edit']);
    Route::apiResource('UserCours',UserCoursController::class)->except(['create','edit']);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
