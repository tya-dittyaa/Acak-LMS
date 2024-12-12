<?php

namespace Database\Seeders;

use App\Models\TeamRole;
use Illuminate\Database\Seeder;

class TeamRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'Owner'],
            ['name' => 'Member'],
        ];

        foreach ($roles as $role) {
            TeamRole::create($role);
        }
    }
}
