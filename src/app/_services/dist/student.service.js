"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.StudentService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("@environments/environment");
var StudentService = /** @class */ (function () {
    function StudentService(http, pipe) {
        var _this = this;
        this.http = http;
        this.pipe = pipe;
        this._studentApi = environment_1.environment.studentApi + "/Students";
        this._loading$ = new rxjs_1.BehaviorSubject(true);
        this._search$ = new rxjs_1.Subject();
        this._students$ = new rxjs_1.BehaviorSubject([]);
        this._total$ = new rxjs_1.BehaviorSubject(0);
        this._state = {
            page: 1,
            pageSize: 2,
            searchTerm: '',
            sortColumn: '',
            sortDirection: ''
        };
        this._search$
            .pipe(operators_1.tap(function () { return _this._loading$.next(true); }), operators_1.switchMap(function () { return _this._getStudents(); }), operators_1.switchMap(function (students) { return _this._search(students); }), operators_1.tap(function () { return _this._loading$.next(false); })).subscribe(function (result) {
            _this._students$.next(result.students);
            _this._total$.next(result.total);
        });
        this._search$.next();
    }
    Object.defineProperty(StudentService.prototype, "students$", {
        get: function () { return this._students$.asObservable(); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudentService.prototype, "total$", {
        get: function () { return this._total$.asObservable(); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudentService.prototype, "loading$", {
        get: function () { return this._loading$.asObservable(); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudentService.prototype, "page", {
        get: function () { return this._state.page; },
        set: function (page) { this._set({ page: page }); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudentService.prototype, "pageSize", {
        get: function () { return this._state.pageSize; },
        set: function (pageSize) { this._set({ pageSize: pageSize }); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudentService.prototype, "searchTerm", {
        get: function () { return this._state.searchTerm; },
        set: function (searchTerm) { this._set({ searchTerm: searchTerm }); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudentService.prototype, "sortColumn", {
        set: function (sortColumn) { this._set({ sortColumn: sortColumn }); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudentService.prototype, "sortDirection", {
        set: function (sortDirection) { this._set({ sortDirection: sortDirection }); },
        enumerable: false,
        configurable: true
    });
    StudentService.prototype._set = function (patch) {
        Object.assign(this._state, patch);
        this._search$.next();
    };
    StudentService.prototype._refreshData = function () {
        this._search$.next();
    };
    StudentService.prototype._getStudents = function () {
        return this.http.get("" + this._studentApi);
    };
    StudentService.prototype._getStudent = function (studentId) {
        if (!studentId) {
            return rxjs_1.of(null);
        }
        return this.http.get(this._studentApi + "/" + studentId);
    };
    StudentService.prototype._addStudent = function (student) {
        return this.http.post("" + this._studentApi, student);
    };
    StudentService.prototype._editStudent = function (student) {
        return this.http.put("" + this._studentApi, student);
    };
    StudentService.prototype._deleteStudent = function (studentId) {
        return this.http["delete"](this._studentApi + "/" + studentId);
    };
    StudentService.prototype._search = function (students) {
        var _this = this;
        var _a = this._state, sortColumn = _a.sortColumn, sortDirection = _a.sortDirection, pageSize = _a.pageSize, page = _a.page, searchTerm = _a.searchTerm;
        students = sort(students, sortColumn, sortDirection);
        students = students.filter(function (student) { return matches(student, searchTerm, _this.pipe); });
        var total = students.length;
        students = students.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return rxjs_1.of({ students: students, total: total });
    };
    StudentService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], StudentService);
    return StudentService;
}());
exports.StudentService = StudentService;
var compare = function (v1, v2) { return v1 < v2 ? -1 : v1 > v2 ? 1 : 0; };
function sort(students, column, direction) {
    if (direction === '' || column === '') {
        return students;
    }
    else {
        return __spreadArrays(students).sort(function (a, b) {
            var res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(student, term, pipe) {
    return student.userName.toLowerCase().includes(term.toLowerCase())
        || student.firstName.toLowerCase().includes(term.toLowerCase())
        || student.lastName.toLowerCase().includes(term.toLowerCase())
        || student.career.toLowerCase().includes(term.toLowerCase())
        || pipe.transform(student.id).includes(term)
        || pipe.transform(student.age).includes(term);
}
