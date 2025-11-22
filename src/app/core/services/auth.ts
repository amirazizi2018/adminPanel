import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse, UserInfo } from '../models/user-info.moel'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user = signal<UserInfo | null>(null);

    private http = inject(HttpClient);
    private router = inject(Router);
    private baseUrl = environment.apiUrl;

    constructor() {
        this.restoreUserFromStorage();
    }


    login(credentials: { email: string; password: string }) {
        return this.http.post<LoginResponse>(
            `${this.baseUrl}/auth/login`,
            {
                ...credentials,
                role: "Admin"
            }
        );
    }

    setUser(user: UserInfo) {
        this.user.set(user);
        localStorage.setItem('user', JSON.stringify(user));
    }


    getUser(): UserInfo | null {
        return this.user();
    }


    isLoggedIn(): boolean {
        return this.user() !== null;
    }

    logout() {
        this.user.set(null);
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    restoreUserFromStorage() {
        const raw = localStorage.getItem('user');
        if (raw) {
            try {
                const parsed = JSON.parse(raw) as UserInfo;
                this.user.set(parsed);
            } catch {
                localStorage.removeItem('user');
            }
        }
    }

}
