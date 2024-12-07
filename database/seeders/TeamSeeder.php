<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('team')->insert([
            'TeamId' => 1,
            'Description' => 'IT Division + Antony',
            'DueDate' => '2025-10-10 09:00:00'
        ]);
    }
}
