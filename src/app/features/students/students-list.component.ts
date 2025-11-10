import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-students-list',
    templateUrl: './students-list.html',
    standalone: true,
    imports: [CommonModule]
})
export class StudentsListComponent implements OnInit {
    students: any[] = [];
    loading = false;
    error = '';

    constructor(private api: ApiService, private router: Router) { }

    ngOnInit(): void {
        this.load();
    }

    load() {
        this.loading = true;
        this.api.getStudents().subscribe({
            next: (res: any) => { this.students = res ?? []; this.loading = false; },
            error: (err) => { this.error = 'Failed to load students'; this.loading = false; }
        });
    }

    add() {
        this.router.navigate(['/students/new']);
    }

    edit(id: any) {
        this.router.navigate([`/students/${id}/edit`]);
    }

    delete(id: any) {
        if (!confirm('Delete this student?')) return;
        this.api.deleteStudent(id).subscribe({ next: () => this.load(), error: () => alert('Delete failed') });
    }
}
