import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs'
import { ApiResponse } from '../models/api-response'
import { MeetingModel } from '../models/meeting'
import { CreateMeetingModel } from '../models/create-meeting-model'

@Injectable({
    providedIn: 'root'
})
export class MeetingService {
    private http = inject(HttpClient);
    private base = 'http://localhost:5258/api/meeting';

    getMeetings(): Observable<MeetingModel[]> {
        return this.http.get<ApiResponse<MeetingModel[]>>(this.base)
            .pipe(map(r => r.data));
    }

    createMeeting(payload: CreateMeetingModel): Observable<any> {
        return this.http.post<ApiResponse<MeetingModel>>(this.base, payload);
    }
}
