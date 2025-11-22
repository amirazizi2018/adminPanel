import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response'
import { map } from 'rxjs'
import { environment } from '../../../environments/environment'

export interface User {
    id: string;
    fullName: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;

    getUsers() {
        return this.http.get<ApiResponse<User[]>>(`${this.baseUrl}/user`)
            .pipe(map(r => r.data));
    }
}
