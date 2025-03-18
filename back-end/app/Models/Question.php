<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $primaryKey='id_quest';

    protected $fillable=[
        'description',
        'type',
        'points',
        'chpt_id'
    ];

    public function response(){
        return $this->hasMany(Response::class,'quest_id','id_quest');
    }
    public function chapter(){
        return $this->belongsTo(Chapter::class,'chpt_id','id_chpt');
    }

    public function user(){
        return $this->belongsToMany(User::class,'user_questions','quest_id','user_id');
    }
}
