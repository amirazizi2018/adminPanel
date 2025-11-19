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
        username: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
        password: this.fb.control('', { nonNullable: true, validators: [Validators.required] })
    });

    error = signal<string | null>(null);

    submit() {
        if (this.form.invalid) return;

        const credentials = this.form.getRawValue(); // حالا username و password هر دو string هستن

        this.auth.login(credentials).subscribe({
            next: (res) => {
                this.auth.saveAuth(res.token, res.role);
                this.router.navigate(['/admin/dashboard']);
            },
            error: () => {
                this.error.set('نام کاربری یا رمز عبور اشتباه است');
            }
        });
    }
}
