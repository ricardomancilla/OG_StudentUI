import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Student } from '../_models';
import { DecimalPipe } from '@angular/common';
import { switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../_helpers';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class StudentService {
    private _studentApi: string = `${environment.studentApi}/Students`;
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _students$ = new BehaviorSubject<Student[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        page: 1,
        pageSize: 5,
        searchTerm: '',
        sortColumn: '',
        sortDirection: ''
    };

    constructor(
        private http: HttpClient,
        private pipe: DecimalPipe) {
        this._search$
            .pipe(
                tap(() => this._loading$.next(true)),
                switchMap(() => this._getStudents()),
                switchMap(students => this._search(students)),
                tap(() => this._loading$.next(false))
            ).subscribe(result => {
                this._students$.next(result.students);
                this._total$.next(result.total);
            });

        this._search$.next();
    }

    get students$() { return this._students$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }

    set page(page: number) { this._set({ page }); }
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    _refreshData() {
        this._search$.next();
    }

    _getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(`${this._studentApi}`);
    }

    _getStudent(studentId: number): Observable<Student> {
        if (!studentId) {
            return of(null);
        }
        return this.http.get<Student>(`${this._studentApi}/${studentId}`);
    }

    _addStudent(student: Student): Observable<Student> {
        return this.http.post<Student>(`${this._studentApi}`, student);
    }

    _editStudent(student: Student): Observable<boolean> {
        return this.http.put<boolean>(`${this._studentApi}`, student);
    }

    _deleteStudent(studentId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this._studentApi}/${studentId}`);
    }

    private _search(students: Student[]): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        students = sort(students, sortColumn, sortDirection);

        students = students.filter(student => matches(student, searchTerm, this.pipe));
        const total = students.length;

        students = students.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of<SearchResult>({ students, total });
    }
}

interface SearchResult {
    students: Student[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(students: Student[], column: SortColumn, direction: string): Student[] {
    if (direction === '' || column === '') {
        return students;
    } else {
        return [...students].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(student: Student, term: string, pipe: PipeTransform) {
    return student.userName.toLowerCase().includes(term.toLowerCase())
        || student.firstName.toLowerCase().includes(term.toLowerCase())
        || student.lastName.toLowerCase().includes(term.toLowerCase())
        || student.career.toLowerCase().includes(term.toLowerCase())
        || pipe.transform(student.id).includes(term)
        || pipe.transform(student.age).includes(term);
}