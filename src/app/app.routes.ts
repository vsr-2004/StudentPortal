import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { StudentsListComponent } from './features/students/students-list.component';
import { StudentFormComponent } from './features/students/student-form.component';
import { AuthGuard } from './core/services/auth.guard';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'students', component: StudentsListComponent, canActivate: [AuthGuard] },
    { path: 'students/new', component: StudentFormComponent, canActivate: [AuthGuard] },
    { path: 'students/:id/edit', component: StudentFormComponent, canActivate: [AuthGuard] },
];
