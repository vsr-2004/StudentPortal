import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class DashboardComponent {
    welcomeMessage = 'Welcome to Student Portal';

    constructor(public authService: AuthService) { }
}
