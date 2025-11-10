import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, CommonModule],
    template: `
        <div class="app-container">
            <!-- Top navigation bar -->
            <nav class="top-nav" *ngIf="!authService.isLoggedIn()">
                <div class="nav-brand">Student Portal</div>
                <div class="nav-links">
                    <a routerLink="/login" class="nav-button">Login</a>
                    <a routerLink="/register" class="nav-button">Register</a>
                </div>
            </nav>

            <!-- Authenticated navigation -->
            <nav class="top-nav" *ngIf="authService.isLoggedIn()">
                <div class="nav-brand">Student Portal</div>
                <div class="nav-links">
                    <a href="#" (click)="logout($event)" class="nav-button logout">Logout</a>
                </div>
            </nav>

            <main class="main-content">
                <router-outlet></router-outlet>
            </main>
        </div>
    `,
    styles: [`
        .app-container {
            min-height: 100vh;
            background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('/assets/students-bg.jpg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }

        .top-nav {
            background: rgba(0, 0, 0, 0.8);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .nav-brand {
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
        }

        .nav-links {
            display: flex;
            gap: 1rem;
        }

        .nav-button {
            padding: 0.5rem 1.5rem;
            border-radius: 5px;
            text-decoration: none;
            color: white;
            font-weight: 500;
            transition: all 0.3s ease;
            
            &:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            &.logout {
                background: #e74c3c;
                &:hover {
                    background: #c0392b;
                }
            }
        }

        .main-content {
            min-height: calc(100vh - 64px);
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
    `]
})
export class AppComponent {
    constructor(public authService: AuthService) { }

    logout(event: Event) {
        event.preventDefault();
        this.authService.logout();
    }
}
