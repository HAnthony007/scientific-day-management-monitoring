<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intervention extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre', 'description', 'heure_deb', 'heure_fin', 'event_id', 'intervenant_id', 'type_intervention', 'document_id'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function intervenant()
    {
        return $this->belongsTo(User::class, 'intervenant_id');
    }

    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }
}
