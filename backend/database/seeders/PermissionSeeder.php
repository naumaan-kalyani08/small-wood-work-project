<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;


class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Contact form permissions
        Permission::firstOrCreate(['name' => 'view_all_contacts']);
        Permission::firstOrCreate(['name' => 'view_own_contacts']);
        Permission::firstOrCreate(['name' => 'delete_contacts']);
        Permission::firstOrCreate(['name' => 'export_contacts']);
        // Contact form permissions

        Permission::firstOrCreate(['name' => 'view_all_users']);
        Permission::firstOrCreate(['name' => 'view_create_users']);
        Permission::firstOrCreate(['name' => 'edit_user']);
        Permission::firstOrCreate(['name' => 'delete_user']);
    }
}
