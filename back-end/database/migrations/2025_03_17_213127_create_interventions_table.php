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
        Schema::create('interventions', function (Blueprint $table) {
            $table->bigIncrements('id_intervention');
            $table->string('titre');
            $table->text('description');
            $table->time('heure_deb');
            $table->time('heure_fin');
            $table->foreignId('event_id')->constrained('events', 'id_event');
            $table->foreignId('intervenant_id')->constrained('users', 'id_user');
            $table->enum('type_intervention', ['conference', 'atelier', 'table ronde']);
            // $table->foreignId('document_id')->nullable()->constrained('documents')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interventions');
    }
};
