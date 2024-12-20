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
            $table->uuid('id')->primary();
            $table->uuid('team_id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('priority', ['Low', 'Mid', 'High']);
            $table->timestamp('due_date');
            $table->enum('status', ['Open', 'In Progress', 'Completed', 'Overdue']);
            $table->timestamps();

            $table->foreign('team_id')->references('id')->on('teams')->cascadeOnDelete();
        });

        Schema::create('task_assignees', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('task_id'); // Relasi ke tasks
            $table->uuid('member_id'); // Relasi ke users (member yang di-assign)
            $table->timestamps();

            $table->foreign('task_id')->references('id')->on('tasks')->cascadeOnDelete();
            $table->foreign('member_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_assignees');
        Schema::dropIfExists('tasks');
    }
};
