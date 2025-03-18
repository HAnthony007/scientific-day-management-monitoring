<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

     public function getJWTIdentifier()
    {
        return $this->getKey(); // Retourne l'identifiant de l'utilisateur (généralement l'ID)
    }

    // Définir les revendications personnalisées pour le token
    public function getJWTCustomClaims()
    {
        return [
            'name'=>$this->name,
            'email'=>$this->email,
            'role'=>$this->role,
        ]; // Vous pouvez ajouter des revendications personnalisées ici si nécessaire
    }
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'photo',
        // 'phoneNumber',
    ];

    public function events()
    {
        return $this->hasMany(Event::class, 'organisateur_id');
    }

    public function interventions()
    {
        return $this->hasMany(Intervention::class, 'intervenant_id');
    }

    public function participants()
    {
        return $this->hasMany(Participant::class, 'user_id');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
