import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MeetingService } from '../../core/services/meeting';
import { UserService, User } from '../../core/services/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateMeetingModel } from '../../core/models/create-meeting-model'


@Component({
    selector: 'app-meeting-create',
    standalone: true,
    imports: [ ReactiveFormsModule, CommonModule ],
    templateUrl: './meeting-create.html',
    styleUrl: './meeting-create.scss'
})
export class MeetingCreate {
    private fb = inject(FormBuilder);
    private meetingService = inject(MeetingService);
    private userService = inject(UserService);
    private router = inject(Router);

    users = signal<User[]>([]);

    form: FormGroup = this.fb.group({
        title: [ '', Validators.required ],
        description: [ '', Validators.required ],
        resolutions: this.fb.array([])
    });

    constructor() {
        this.userService.getUsers().subscribe(users => this.users.set(users));
    }

    // Getter
    get resolutions(): FormArray {
        return this.form.get('resolutions') as FormArray;
    }

    addResolution() {
        this.resolutions.push(
            this.fb.group({
                content: [ '', Validators.required ],
                deadline: [ '', Validators.required ],
                userId: [ '', Validators.required ]
            })
        );
    }

    removeResolution(i: number) {
        this.resolutions.removeAt(i);
    }

    submit() {
        if (this.form.invalid) return;

        const payload: CreateMeetingModel = this.form.value;
        this.meetingService.createMeeting(payload).subscribe({
            next: () => this.router.navigate([ '/admin/dashboard' ]),
            error: () => alert('خطا در ثبت اطلاعات')
        });
    }
}
