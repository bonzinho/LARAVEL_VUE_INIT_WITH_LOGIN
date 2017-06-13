<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Candi\User::class, 1)
            ->states('admin')
            ->create([
                'name' => 'Vitor Bonzinho',
                'email' => 'admin@user.com',
            ]);
    }
}
