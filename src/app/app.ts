import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private auth = inject(AuthService);

  protected readonly title = signal('سامانه مدیریت جلسات');

  user(){
    return this.auth.getUser();
  }

  logout(){
    this.auth.logout();
  }

}
