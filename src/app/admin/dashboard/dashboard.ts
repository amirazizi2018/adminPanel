import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingService } from '../../core/services/meeting'
import { RouterModule } from '@angular/router'
import { MeetingModel } from '../../core/models/meeting'
import { JalaliDatePipe } from "../../shared/pipes/jalali-date.pipe";


@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [CommonModule, RouterModule, JalaliDatePipe],
	templateUrl: './dashboard.html',
	styleUrl: './dashboard.scss'
})
export class Dashboard {
	private meetingService = inject(MeetingService);

	meetings = signal<MeetingModel[]>([]);
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
