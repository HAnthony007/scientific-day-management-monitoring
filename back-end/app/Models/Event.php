<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $fillable = [
        'title', 'description', 'content', 'date_deb', 'date_fin','lieu', 'organisateur_id'
    ];

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organisateur_id');
    }

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
