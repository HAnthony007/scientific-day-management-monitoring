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
        Schema::create('documents', function (Blueprint $table) {
            $table->bigIncrements('id_document');
            $table->string('nom_fichier');
            $table->string('chemin_stockage');
            $table->foreignId('event_id')->constrained('events', 'id_event');
            $table->foreignId('intervention_id')->nullable()->constrained('interventions', 'id_intervention')->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
