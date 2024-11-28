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
        Schema::table('tasks', function (Blueprint $table) {
            $table->foreign('MemberId')->references('MemberId')->on('members')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('PriorityId')->references('PriorityId')->on('priority')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('ActionId')->references('ActionId')->on('actions')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['MemberId']);
            $table->dropForeign(['PriorityId']);
            $table->dropForeign(['ActionId']);
        });
    }
};
