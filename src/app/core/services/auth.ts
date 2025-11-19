import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TOKEN_KEY = 'auth_token';
    private readonly ROLE_KEY = 'user_role';

    private http = inject(HttpClient);
    private router = inject(Router);

    login(credentials: { username: string; password: string }) {
        return this.http.post<{ token: string; role: string }>(
            'http://localhost:5258/api/auth/login',
            credentials
        );
    }

    saveAuth(token: string, role: string) {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.ROLE_KEY, role);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    getUserRole(): string | null {
        return localStorage.getItem(this.ROLE_KEY);
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.ROLE_KEY);
        this.router.navigate(['/admin/login']);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}
