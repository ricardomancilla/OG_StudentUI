"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StudentsCuComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var StudentsCuComponent = /** @class */ (function () {
    function StudentsCuComponent(fb, studentService, alertService, sidebarService) {
        var _this = this;
        this.fb = fb;
        this.studentService = studentService;
        this.alertService = alertService;
        this.sidebarService = sidebarService;
        this._search$ = new rxjs_1.Subject();
        this._student$ = new rxjs_1.BehaviorSubject(null);
        this._loading$ = new rxjs_1.BehaviorSubject(true);
        this._search$
            .pipe(operators_1.tap(function () { return _this._loading$.next(true); }), operators_1.switchMap(function () { return _this.studentService._getStudent(_this.studentId); }), operators_1.tap(function () { return _this._loading$.next(false); })).subscribe(function (result) {
            _this._student$.next(result);
        });
    }
    Object.defineProperty(StudentsCuComponent.prototype, "f", {
        get: function () { return this.studentForm.controls; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudentsCuComponent.prototype, "studentModel", {
        get: function () {
            var _a;
            return {
                id: (_a = this.student) === null || _a === void 0 ? void 0 : _a.id,
                userName: this.f.userName.value,
                firstName: this.f.firstName.value,
                lastName: this.f.lastName.value,
                career: this.f.career.value,
                age: this.f.age.value
            };
        },
        enumerable: false,
        configurable: true
    });
    StudentsCuComponent.prototype.ngOnInit = function () {
        this.setStudentForm();
        this._search$.next();
    };
    StudentsCuComponent.prototype.getUserId = function (url) {
        var userId = 0;
        if (url.length == 2) {
            userId = Number.parseInt(url[1].path);
        }
        return rxjs_1.of({ userId: userId });
    };
    StudentsCuComponent.prototype.getStudent = function (studentId) {
        if (!studentId)
            return rxjs_1.of(null);
        return this.studentService._getStudent(studentId);
    };
    StudentsCuComponent.prototype.setStudentForm = function () {
        this.studentForm = this.fb.group({
            userName: ['', forms_1.Validators.required],
            firstName: ['', forms_1.Validators.required],
            lastName: ['', forms_1.Validators.required],
            career: ['', forms_1.Validators.required],
            age: ['', forms_1.Validators.required]
        });
    };
    StudentsCuComponent.prototype.setFormValues = function (student) {
        if (student) {
            this.studentForm.patchValue({
                userName: student.userName,
                firstName: student.firstName,
                lastName: student.lastName,
                career: student.career,
                age: student.age
            });
        }
        return rxjs_1.of(student);
    };
    StudentsCuComponent.prototype.onSubmit = function () {
        if (!this.student)
            this.save();
        else
            this.update();
    };
    StudentsCuComponent.prototype.save = function () {
        var _this = this;
        this.studentService._addStudent(this.studentModel)
            .subscribe(function (_) {
            _this.alertService.success('Student created.', true);
            _this.sidebarService.close(_this.sidebarId);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    StudentsCuComponent.prototype.update = function () {
        var _this = this;
        this.studentService._editStudent(this.studentModel)
            .subscribe(function (_) {
            _this.alertService.success('Student updated.', true);
            _this.sidebarService.close(_this.sidebarId);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    __decorate([
        core_1.Input()
    ], StudentsCuComponent.prototype, "sidebarId");
    __decorate([
        core_1.Input()
    ], StudentsCuComponent.prototype, "studentId");
    StudentsCuComponent = __decorate([
        core_1.Component({
            selector: 'app-students-cu',
            templateUrl: './students-cu.component.html',
            styleUrls: ['./students-cu.component.scss']
        })
    ], StudentsCuComponent);
    return StudentsCuComponent;
}());
exports.StudentsCuComponent = StudentsCuComponent;
