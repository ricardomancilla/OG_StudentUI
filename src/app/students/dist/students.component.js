"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.StudentsComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var _helpers_1 = require("@app/_helpers");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var StudentsComponent = /** @class */ (function () {
    function StudentsComponent(studentService, sidebarService, modalService, alertService) {
        this.studentService = studentService;
        this.sidebarService = sidebarService;
        this.modalService = modalService;
        this.alertService = alertService;
        this.faEdit = free_solid_svg_icons_1.faEdit;
        this.faPlus = free_solid_svg_icons_1.faPlus;
        this.faTrash = free_solid_svg_icons_1.faTrashAlt;
        this.students$ = studentService.students$;
        this.total$ = studentService.total$;
    }
    StudentsComponent.prototype.onSort = function (_a) {
        var column = _a.column, direction = _a.direction;
        this.headers.forEach(function (header) {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });
        this.studentService.sortColumn = column;
        this.studentService.sortDirection = direction;
    };
    StudentsComponent.prototype.openSidebar = function (sidebarId, studentId) {
        this.currentStudentId = studentId;
        this.currentSidebarId = sidebarId;
        this.sidebarService.open(sidebarId);
    };
    StudentsComponent.prototype.deleteStudent = function (student) {
        return __awaiter(this, void 0, void 0, function () {
            var configModalRef, modalConfirmComponent;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        configModalRef = this.modalService.open(_helpers_1.ConfirmationModalComponent, { backdrop: "static", keyboard: false });
                        modalConfirmComponent = (configModalRef.componentInstance);
                        modalConfirmComponent.message = "Do you want to delete the student '" + student.userName + "'?";
                        return [4 /*yield*/, configModalRef.result.then(function (_) {
                                _this.studentService._deleteStudent(student.id)
                                    .subscribe(function (_) {
                                    _this.alertService.success('Student deleted.', true);
                                    _this.studentService._refreshData();
                                }, function (error) {
                                    _this.alertService.error(error.message);
                                });
                            }, function (_) { })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChildren(_helpers_1.NgbdSortableHeader)
    ], StudentsComponent.prototype, "headers");
    StudentsComponent = __decorate([
        core_1.Component({
            selector: 'app-students',
            templateUrl: './students.component.html',
            styleUrls: ['./students.component.scss'],
            providers: [common_1.DecimalPipe]
        })
    ], StudentsComponent);
    return StudentsComponent;
}());
exports.StudentsComponent = StudentsComponent;
