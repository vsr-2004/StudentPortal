import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [RouterModule, CommonModule],
    template: `
        <nav class="main-nav" *ngIf="authService.isLoggedIn()">
            <div class="nav-brand">Student Portal</div>
            <ul class="nav-links">
                <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
                <li><a routerLink="/students" routerLinkActive="active">Manage Students</a></li>
                <li><a href="#" (click)="logout($event)" class="logout-link">Logout</a></li>
            </ul>
        </nav>
    `,
    styles: [`
        .main-nav {
            background: #2c3e50;
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
            gap: 2rem;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .nav-links a {
            color: #ecf0f1;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: all 0.3s ease;
        }

        .nav-links a:hover, .nav-links a.active {
            background: #3498db;
            color: white;
        }

        .logout-link {
            background: #e74c3c;
            &:hover {
                background: #c0392b !important;
            }
        }
    `]
})
export class NavComponent {
    constructor(public authService: AuthService) {}

    logout(event: Event) {
        event.preventDefault();
        this.authService.logout();
    }
}