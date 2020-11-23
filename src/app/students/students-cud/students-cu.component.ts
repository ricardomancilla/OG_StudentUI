import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '@app/_models';
import { AlertService, SidebarService, StudentService } from '@app/_services';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-students-cu',
  templateUrl: './students-cu.component.html',
  styleUrls: ['./students-cu.component.scss']
})
export class StudentsCuComponent implements OnInit {

  private _search$ = new Subject<void>();
  private _loading$ = new BehaviorSubject<boolean>(true);

  private student?: Student;
  studentForm: FormGroup;
  submitted: boolean = false;

  @Input() sidebarId: string;
  @Input() studentId?: number;

  get loading$() { return this._loading$.asObservable(); }

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private alertService: AlertService,
    public sidebarService: SidebarService) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        switchMap(() => this.studentService._getStudent(this.studentId)),
        tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this.student = result;
        this.setStudentFormValues(result);
      });
  }

  get f() { return this.studentForm.controls; }

  get studentModel(): Student {
    return {
      id: this.student?.id,
      userName: this.f.userName.value,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      career: this.f.career.value,
      age: this.f.age.value
    };
  }

  ngOnInit() {
    this.initStudentForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.submitted = false;
    for (const propName in changes) {
      const propertyChange = changes[propName];
      if (propName == 'studentId' && propertyChange.currentValue != propertyChange.previousValue) {
        this._search$.next();
      }
    }
  }

  getStudent(studentId: number) {
    if (!studentId)
      return of(null);

    return this.studentService._getStudent(studentId);
  }

  initStudentForm() {
    this.studentForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      career: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(5)]]
    });
  }

  setStudentFormValues(student: Student) {
    if (student) {
      this.studentForm.patchValue({
        userName: student.userName,
        firstName: student.firstName,
        lastName: student.lastName,
        career: student.career,
        age: student.age
      });
    }
    return of<Student>(student);
  }

  onSubmit() {
    if (!this.studentForm.valid) {
      return false;
    }

    if (!this.student) {
      this.save();
    }
    else {
      this.update();
    }
  }

  save() {
    this.studentService._addStudent(this.studentModel)
      .subscribe(_ => {
        this.alertService.success('Student created.', true);
        this.sidebarService.close(this.sidebarId);
        this.studentService._refreshData();
        this.submitted = false;
        this.initStudentForm();
      }, error => {
        this.alertService.error(error.message);
      });
  }

  update() {
    this.studentService._editStudent(this.studentModel)
      .subscribe(_ => {
        this.alertService.success('Student updated.', true);
        this.sidebarService.close(this.sidebarId);
        this.studentService._refreshData();
        this.submitted = false;
        this.initStudentForm();
      }, error => {
        this.alertService.error(error.message);
      });
  }

}
