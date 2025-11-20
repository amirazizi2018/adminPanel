import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response'
import { map } from 'rxjs'

export interface User {
    id: string;
    fullName: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
    private http = inject(HttpClient);

    getUsers() {
        return this.http.get<ApiResponse<User[]>>('http://localhost:5258/api/user')
            .pipe(map(r => r.data));
    }
}
