import { Routes } from '@angular/router';
import { AdminAuthGuard } from './core/guards/admin-auth-guard'
import { Login } from './admin/login/login'
import { Dashboard } from './admin/dashboard/dashboard'
import { MeetingCreate } from './admin/meeting-create/meeting-create'
import { MeetingDetail } from './admin/meeting-detail/meeting-detail'



export const routes: Routes = [
    { path: '', redirectTo: 'admin/login', pathMatch: 'full' },

    { path: 'admin/login', component: Login},
    {
        path: 'admin',
        canActivate: [AdminAuthGuard],
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'meeting-create', component: MeetingCreate },
            { path: 'meeting-detail/:id', component: MeetingDetail },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'admin/login' }
];

