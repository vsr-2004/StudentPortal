import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class LoginComponent {
    username = '';
    password = '';
    error = '';

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        this.authService.login({ username: this.username, password: this.password })
            .subscribe({
                next: () => {
                    // Navigation is handled in the auth service
                },
                error: (err) => this.error = 'Invalid credentials'
            });
    }
}
