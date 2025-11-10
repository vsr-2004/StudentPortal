import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private storageKey = 'student_portal_token';

    constructor(private api: ApiService, private router: Router) { }

    register(data: { username: string; password: string }): Observable<any> {
        return this.api.register(data);
    }

    login(credentials: { username: string; password: string }): Observable<any> {
        return this.api.login(credentials).pipe(
            tap((res: any) => {
                if (res && (res.token || res.accessToken)) {
                    const token = res.token ?? res.accessToken;
                    localStorage.setItem(this.storageKey, token);
                    this.router.navigate(['/students']);
                }
            })
        );
    }

    logout() {
        localStorage.removeItem(this.storageKey);
        this.router.navigate(['/dashboard']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.storageKey);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}
