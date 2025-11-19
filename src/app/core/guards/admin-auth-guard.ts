import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

export const AdminAuthGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const user = auth.getUser();
    if (user?.role === 'Admin') {
        return true;
    }

    router.navigate([ '/admin/login' ]);
    return false;
};
