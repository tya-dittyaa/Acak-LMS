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
        Schema::create('teamdetails', function (Blueprint $table) {
            $table->unsignedBigInteger('TeamId');
            $table->unsignedBigInteger('MemberId');
            $table->foreign('MemberId')->references('MemberId')->on('members')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('TeamId')->references('TeamId')->on('team')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teamdetails');
    }
};
