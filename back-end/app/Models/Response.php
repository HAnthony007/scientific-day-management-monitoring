<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasFactory;

    protected $primaryKey='id_resp';

    protected $fillable=[
        'value',
        'isTrue',
        'quest_id'
    ];

    public function question(){
        return $this->belongsTo(Question::class,'quest_id','id_quest');
    }

}
