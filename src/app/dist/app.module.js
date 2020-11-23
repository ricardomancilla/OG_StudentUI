"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var ngx_toastr_1 = require("ngx-toastr");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var _helpers_1 = require("./_helpers");
var students_component_1 = require("./students/students.component");
var common_1 = require("@angular/common");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var students_cu_component_1 = require("./students/students-cud/students-cu.component");
var sidebar_component_1 = require("./_helpers/sidebar/sidebar.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                _helpers_1.ConfirmationModalComponent,
                _helpers_1.AlertComponent,
                students_component_1.StudentsComponent,
                students_cu_component_1.StudentsCuComponent,
                sidebar_component_1.SidebarComponent,
                _helpers_1.NgbdSortableHeader,
                _helpers_1.IntegerOnlyInput,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                ng_bootstrap_1.NgbModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                angular_fontawesome_1.FontAwesomeModule,
                ngx_toastr_1.ToastrModule.forRoot({
                    closeButton: true,
                    timeOut: 5000,
                    preventDuplicates: false,
                    positionClass: 'toast-top-right'
                })
            ],
            providers: [
                common_1.DecimalPipe,
                { provide: http_1.HTTP_INTERCEPTORS, useClass: _helpers_1.ErrorInterceptor, multi: true },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
