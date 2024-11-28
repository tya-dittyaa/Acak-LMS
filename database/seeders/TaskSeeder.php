<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tasks')->insert([
            'TaskId' => 1,
            'Task' => 'Setup Database',
            'CreatedAt' => '2024-10-06 01:25:42',
            'MemberId' => 1,
            'UpdatedAt' => '2024-10-06 01:25:42',
            'PriorityId' => 1,
            'ActionId' => 1,
            'Deadline' => '2025-10-10 09:00:00'
        ]);
    }
}
