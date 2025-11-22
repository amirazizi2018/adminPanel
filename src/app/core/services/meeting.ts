import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs'
import { ApiResponse } from '../models/api-response'
import { MeetingModel } from '../models/meeting'
import { CreateMeetingModel } from '../models/create-meeting-model'
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class MeetingService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;

    getMeetings(): Observable<MeetingModel[]> {
        return this.http.get<ApiResponse<MeetingModel[]>>(`${this.baseUrl}/meeting`)
            .pipe(map(r => r.data));
    }

    createMeeting(payload: CreateMeetingModel): Observable<any> {
        return this.http.post<ApiResponse<MeetingModel>>(`${this.baseUrl}/meeting`, payload);
    }
}
