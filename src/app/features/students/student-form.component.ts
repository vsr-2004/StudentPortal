import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
    selector: 'app-student-form',
    templateUrl: './student-form.html',
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class StudentFormComponent implements OnInit {
    model: any = { name: '', age: 0, email: '' };
    saving = false;
    isEdit = false;

    constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEdit = true;
            this.api.getStudents().subscribe({
                next: (list: any) => {
                    const found = (list || []).find((s: any) => (s.studentID ?? s.id ?? s.StudentID)?.toString() === id);
                    if (found) this.model = { name: found.name ?? found.Name, age: found.age ?? found.Age, email: found.email ?? found.Email, id };
                }
            });
        }
    }

    save() {
        this.saving = true;
        if (this.isEdit && this.model.id) {
            this.api.updateStudent(this.model.id, { Name: this.model.name, Age: this.model.age, Email: this.model.email })
                .subscribe({ next: () => this.router.navigate(['/students']), error: () => { alert('Save failed'); this.saving = false; } });
        } else {
            this.api.addStudent({ Name: this.model.name, Age: this.model.age, Email: this.model.email })
                .subscribe({ next: () => this.router.navigate(['/students']), error: () => { alert('Create failed'); this.saving = false; } });
        }
    }

    cancel() {
        this.router.navigate(['/students']);
    }
}
