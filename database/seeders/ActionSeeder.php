<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('actions')->insert([
            ['ActionId' => 1, 'Action' => 'Open'],
            ['ActionId' => 2, 'Action' => 'On Progress'],
            ['ActionId' => 3, 'Action' => 'On Hold'],
            ['ActionId' => 4, 'Action' => 'Resolved'],
        ]);
    }
}
