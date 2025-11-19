import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate(): boolean {
        const token = this.auth.getToken();
        const role = this.auth.getUserRole();

        if (token && role === 'admin') {
            return true;
        }

        this.router.navigate([ '/admin/login' ]);
        return false;
    }
}
