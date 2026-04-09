<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdminRole = Role::findByName('super_admin');
        $allPermissions = Permission::all();
        $superAdminRole->syncPermissions($allPermissions);

        $adminRole = Role::findByName('admin');
        $adminRole->givePermissionTo([
            'view_all_contacts',
            'delete_contacts',
            'export_contacts'
        ]);

        $userRole = Role::findByName('user');
        $userRole->givePermissionTo([
            'view_own_contacts'
        ]);
    }
}
