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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id('TaskId');
            $table->string('Task'); 
            $table->string('CreatedAt'); 
            $table->unsignedBigInteger('MemberId'); 
            $table->string('UpdatedAt');
            $table->unsignedBigInteger('PriorityId');
            $table->unsignedBigInteger('ActionId');
            $table->string('Deadline');
            $table->unsignedBigInteger('TeamId');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
