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
        Schema::create('teams', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('icon')->nullable();
            $table->boolean('is_gdrive_icon')->default(false);
            $table->timestamps();
        });

        Schema::create('teams_roles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('teams_mapping', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('teams_id');
            $table->uuid('member_id');
            $table->uuid('role_id');
            $table->timestamp('joined_at')->useCurrent();
            $table->timestamps();

            $table->foreign('teams_id')->references('id')->on('teams')->cascadeOnDelete();
            $table->foreign('member_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('role_id')->references('id')->on('teams_roles')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams_mapping');
        Schema::dropIfExists('teams_roles');
        Schema::dropIfExists('teams');
    }
};
