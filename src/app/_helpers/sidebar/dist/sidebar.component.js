"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidebarComponent = void 0;
var core_1 = require("@angular/core");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(sidebarService, el) {
        this.sidebarService = sidebarService;
        this.el = el;
        this.defaultWidth = 580;
        this.title = '';
        this.element = el.nativeElement;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var sidebar = this;
        if (!this.id) {
            console.error('Sidebar must have an ID');
            return;
        }
        if (localStorage.getItem('sidebar_width') === null) {
            localStorage.setItem('sidebar_width', this.defaultWidth.toString());
        }
        else {
            this.defaultWidth = parseInt(localStorage.getItem('sidebar_width'), 10);
            var browserWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
            if (this.defaultWidth > browserWidth) {
                this.defaultWidth = browserWidth;
                this.setSidebarWidth(this.defaultWidth);
            }
        }
        document.body.appendChild(this.element);
        var sidebarComponentData = {
            id: this.id,
            title: this.title,
            open: function () { sidebar.open(); },
            close: function () { sidebar.close(); }
        };
        this.sidebarService.add(sidebarComponentData);
    };
    SidebarComponent.prototype.ngOnDestroy = function () {
        this.sidebarService.remove(this.id);
        this.element.remove();
    };
    SidebarComponent.prototype.setSidebarWidth = function (width) {
        localStorage.setItem('sidebar_width', width.toString());
    };
    SidebarComponent.prototype.open = function () {
        this.element.classList.add('sidebar__open');
    };
    SidebarComponent.prototype.close = function () {
        this.element.classList.remove('sidebar__open');
    };
    __decorate([
        core_1.Input()
    ], SidebarComponent.prototype, "id");
    __decorate([
        core_1.Input()
    ], SidebarComponent.prototype, "title");
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss']
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
