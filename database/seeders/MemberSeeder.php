<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('members')->insert([
            ['MemberId' => 1, 'MemberName' => 'Charles Widjaja Tjung'],
            ['MemberId' => 2, 'MemberName' => 'Aditya Fajri'],
            ['MemberId' => 3, 'MemberName' => 'Karina Dwinovera Mulia'],
            ['MemberId' => 4, 'MemberName' => 'Anthony Lawrence Cornelis']
        ]);
    }
}
