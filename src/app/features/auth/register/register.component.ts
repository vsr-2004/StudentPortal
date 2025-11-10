import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.html',
    styleUrls: ['./register.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
    username = '';
    email = '';
    password = '';
    confirmPassword = '';
    error = '';
    success = '';

    constructor(private authService: AuthService, private router: Router) { }

    register() {
        if (this.password !== this.confirmPassword) {
            this.error = 'Passwords do not match';
            return;
        }
        this.authService.register({ username: this.username, password: this.password })
            .subscribe({
                next: () => {
                    this.success = 'Registration Successful! Redirecting to login...';
                    // Redirect immediately to login page
                    this.router.navigate(['/login']);
                },
                error: (err) => this.error = 'Registration failed'
            });
    }
}
