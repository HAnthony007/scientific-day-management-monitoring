<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_event';

    protected $fillable = [
        'title', 'content', 'color', 'date_deb', 'date_fin','location' 
    ];

    public function interventions()
    {
        return $this->hasMany(Intervention::class, 'event_id');
    }

    public function participants()
    {
        return $this->hasMany(Participant::class, 'event_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'event_id');
    }
}
