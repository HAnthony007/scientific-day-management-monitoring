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
        Schema::create('events', function (Blueprint $table) {
            $table->bigIncrements('id_event');
            $table->string('title');
            $table->string('description');
            $table->text('content');
            $table->dateTime('date_deb');
            $table->dateTime('date_fin');
            $table->string('lieu');
            $table->foreignId('organisateur_id')->constrained('users', 'id_user');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
