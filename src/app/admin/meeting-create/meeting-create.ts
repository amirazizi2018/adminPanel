import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MeetingService } from '../../core/services/meeting';
import { UserService, User } from '../../core/services/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateMeetingModel } from '../../core/models/create-meeting-model'
import { JalaliDatePipe } from "../../shared/pipes/jalali-date.pipe";


@Component({
    selector: 'app-meeting-create',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, JalaliDatePipe],
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
        meetingDate: [ '', Validators.required ],
        resolutions: this.fb.array([])
    }, { validators: this.validateDeadlines.bind(this) });

    constructor() {
        this.userService.getUsers().subscribe(users => this.users.set(users));
    }

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

        const { meetingDate, ...rest } = this.form.value;

        const payload: CreateMeetingModel = {
            ...rest,
            meetingDate,
            resolutions: rest.resolutions.map((r: any) => ({
                ...r,
                deadline: r.deadline ? `${r.deadline}T00:00` : null,
            }))
        };

        this.meetingService.createMeeting(payload).subscribe({
            next: () => {
                alert('جلسه با موفقیت ثبت شد');
                this.form.reset();
                this.router.navigate(['/admin/dashboard']);
            },
            error: () => alert('خطا در ثبت اطلاعات')
        });
    }

    resolutionForm = this.fb.group({
        content: ['', Validators.required],
        deadline: ['', Validators.required],
        userId: ['', Validators.required]
    });

    submitResolution() {
        if (this.resolutionForm.invalid) return;

        this.resolutions.push(this.fb.group(this.resolutionForm.value));
        this.resolutionForm.reset();  // پاک‌سازی فرم
    }


    getUserName(userId: any): string {
        const u = this.users().find(x => x.id === userId);
        return u ? u.fullName  : '';
    }


    validateDeadlines(control: FormGroup) {
        const meetingDate = control.get('meetingDate')?.value;

        if (!meetingDate) return null;

        const resolutions = control.get('resolutions')?.value;
        if (!resolutions || !resolutions.length) return null;

        for (const r of resolutions) {
            if (r.deadline && r.deadline < meetingDate.split('T')[0]) {
                return { deadlineBeforeMeeting: true };
            }
        }
        return null;
    }
}
