<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('priority')->insert([
            ['PriorityId' => 1, 'Priority' => 'Low'],
            ['PriorityId' => 2, 'Priority' => 'Mid'],
            ['PriorityId' => 3, 'Priority' => 'High']
        ]);
    }
}
