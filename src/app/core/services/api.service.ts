import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
    // Use proxy during development: requests to /api will be forwarded to the backend (https://localhost:7202)
    private baseUrl = '/api';

    constructor(private http: HttpClient) { }

    login(credentials: { username: string; password: string }): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/login`, credentials);
    }

    register(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/register`, data);
    }

    getStudents(): Observable<any> {
        return this.http.get(`${this.baseUrl}/students`);
    }

    addStudent(student: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/students`, student);
    }

    updateStudent(id: string, student: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/students/${id}`, student);
    }

    deleteStudent(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/students/${id}`);
    }
}
