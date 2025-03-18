<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    use HasFactory;

    protected $primaryKey="id_chpt";

    protected $fillable=[
        'title',
        'contents',
        'orders',
        'cours_id'
    ];

    public function course(){
        return $this->belongsTo(Course::class,'cours_id','id_cours');
    }

    public function questions(){
        return $this->hasMany(Question::class,'chpt_id','id_chpt');
    }
}
