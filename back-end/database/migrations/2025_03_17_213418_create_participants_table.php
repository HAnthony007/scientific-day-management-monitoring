<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('participants', function (Blueprint $table) {
            $table->bigIncrements('id_participant');
            $table->foreignId('user_id')->constrained('users', 'id_user');
            $table->foreignId('event_id')->constrained('events', 'id_event');
            $table->enum('status', ['inscrit', 'valide', 'absent'])->default('inscrit');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};
