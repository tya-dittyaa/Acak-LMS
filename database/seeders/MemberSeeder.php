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
            ['MemberId' => 1, 'MemberName' => 'Charles Widjaja Tjung', 'Email' => 'charles.tjung@binus.ac.id', 'Password' => 'abc123', 'ProfilePicture' => 'https://i.pinimg.com/originals/67/b9/4a/67b94abda90218b077da5762a0df0d2c.jpg'],
            ['MemberId' => 2, 'MemberName' => 'Aditya Fajri', 'Email' => 'aditya.fajri@binus.ac.id', 'Password' => 'abc123', 'ProfilePicture' => 'https://i.pinimg.com/originals/67/b9/4a/67b94abda90218b077da5762a0df0d2c.jpg'],
            ['MemberId' => 3, 'MemberName' => 'Karina Dwinovera Mulia', 'Email' => 'karina.mulia@binus.ac.id', 'Password' => 'abc123', 'ProfilePicture' => 'https://i.pinimg.com/originals/67/b9/4a/67b94abda90218b077da5762a0df0d2c.jpg'],
            ['MemberId' => 4, 'MemberName' => 'Anthony Lawrence Cornelis', 'Email' => 'antony.cornelis@binus.ac.id', 'Password' => 'abc123', 'ProfilePicture' => 'https://i.pinimg.com/originals/67/b9/4a/67b94abda90218b077da5762a0df0d2c.jpg']
        ]);
    }
}
