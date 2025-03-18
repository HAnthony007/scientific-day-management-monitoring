<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $primaryKey="id_cours";

    protected $fillable=[
        'title',
        'description',
        'language',
        'category',
        'status',
        'ptsRequired'
    ];

    public function chapters(){
        return $this->hasMany(Chapter::class, 'cours_id', 'id_cours');
    }

    public function user(){
        return $this->belongsToMany(User::class,'user_cours','cours_id','user_id');
    }

}
