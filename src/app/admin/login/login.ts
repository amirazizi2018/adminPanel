import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.html'
})
export class Login {
    private fb = inject(FormBuilder);
    private auth = inject(AuthService);
    private router = inject(Router);

    form = this.fb.group({
        email: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
        password: this.fb.control('', { nonNullable: true, validators: [Validators.required] })
    });

    error = signal<string | null>(null);

    submit() {

        if (this.form.invalid) return;

        const credentials = this.form.getRawValue();


        this.auth.login(credentials).subscribe({
            next: (res) => {
                this.auth.setUser(res.data.userInfo);
                this.router.navigate(['/admin/dashboard']);
            },
            error: (err) => {
                this.error.set(err?.error?.message || (Array.isArray(err?.error?.errors) ? err.error.errors[0] : 'خطا در ورود به حساب'))

            }
        });
    }
}
