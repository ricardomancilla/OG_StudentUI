"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidebarService = void 0;
var core_1 = require("@angular/core");
var SidebarService = /** @class */ (function () {
    function SidebarService() {
        this.sidebars = [];
    }
    SidebarService.prototype.add = function (sidebar) {
        this.sidebars.push(sidebar);
    };
    SidebarService.prototype.remove = function (id) {
        this.sidebars = this.sidebars.filter(function (x) { return x.id !== id; });
    };
    SidebarService.prototype.open = function (id) {
        var sidebar = this.sidebars.filter(function (x) { return x.id === id; })[0];
        sidebar.open();
    };
    SidebarService.prototype.close = function (id) {
        var sidebar = this.sidebars.filter(function (x) { return x.id === id; })[0];
        sidebar.close();
    };
    SidebarService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], SidebarService);
    return SidebarService;
}());
exports.SidebarService = SidebarService;
