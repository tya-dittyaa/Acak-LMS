<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamDetailsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('teamdetails')->insert([
            ['TeamId' => 1, 'MemberId' => 1],
            ['TeamId' => 1, 'MemberId' => 2],
            ['TeamId' => 1, 'MemberId' => 3],
            ['TeamId' => 1, 'MemberId' => 4],
        ]);
    }
}
