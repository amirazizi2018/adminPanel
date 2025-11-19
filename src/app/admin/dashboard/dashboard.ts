import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meeting, MeetingService } from '../../core/services/meeting'
import { RouterModule  } from '@angular/router'


@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [ CommonModule, RouterModule  ],
    templateUrl: './dashboard.html'
})
export class Dashboard {
    private meetingService = inject(MeetingService);

    meetings = signal<Meeting[]>([]);
    loading = signal(true);

    constructor() {
        this.meetingService.getMeetings().subscribe({
            next: (data) => {
                this.meetings.set(data);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
            }
        });
    }
}
