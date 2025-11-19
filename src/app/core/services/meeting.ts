import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class MeetingService {
    private http = inject(HttpClient);

    getMeetings() {
        return this.http
            .get<ApiResponse<Meeting[]>>('http://localhost:5258/api/meeting')
            .pipe(map(res => res.data));
    }
}

export interface ApiResponse<T> {
    message: string;
    data: T;
}

export interface Meeting {
    id: string;
    title: string;
    description: string;
    meetingDate: string;
    createdAt: string;
    updatedAt: string;
}
