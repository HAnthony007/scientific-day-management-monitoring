<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom_fichier', 'chemin_stockage', 'event_id', 'intervention_id'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function intervention()
    {
        return $this->belongsTo(Intervention::class, 'intervention_id');
    }
}
