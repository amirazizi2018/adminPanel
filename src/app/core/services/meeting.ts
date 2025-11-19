import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MeetingService {
    private http = inject(HttpClient);

    getMeetings() {
        return this.http.get<Meeting[]>('http://localhost:5258/api/meetings');
    }
}

export interface Meeting {
    id: number;
    title: string;
    date: string;
    description: string;
}
