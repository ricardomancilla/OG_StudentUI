import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { ConfirmationModalComponent, NgbdSortableHeader, SortEvent } from '@app/_helpers';
import { Student } from '@app/_models';
import { AlertService, SidebarService, StudentService } from '@app/_services';
import { Observable } from 'rxjs';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [DecimalPipe]
})
export class StudentsComponent {
  students$: Observable<Student[]>;
  total$: Observable<number>;
  faEdit = faEdit;
  faPlus = faPlus;
  faTrash = faTrashAlt;
  currentStudentId?: number;
  currentSidebarId?: string;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public studentService: StudentService,
    public sidebarService: SidebarService,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {
    this.students$ = studentService.students$;
    this.total$ = studentService.total$;
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.studentService.sortColumn = column;
    this.studentService.sortDirection = direction;
  }

  openSidebar(sidebarId: string, studentId?: number) {
    this.currentStudentId = studentId;
    this.currentSidebarId = sidebarId;
    this.sidebarService.open(sidebarId);
  }

  async deleteStudent(student: Student) {
    const configModalRef = this.modalService.open(ConfirmationModalComponent, { backdrop: "static", keyboard: false });
    var modalConfirmComponent = <ConfirmationModalComponent>(configModalRef.componentInstance);
    modalConfirmComponent.message = `Do you want to delete the student '${student.userName}'?`;

    return await configModalRef.result.then(_ => {
      this.studentService._deleteStudent(student.id)
        .subscribe(_ => {
          this.alertService.success('Student deleted.', true);
          this.studentService._refreshData();
        }, error => {
          this.alertService.error(error.message);
        });
    }, _ => { });
  }
}