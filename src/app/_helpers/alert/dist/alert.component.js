"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AlertComponent = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var AlertComponent = /** @class */ (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.alertService.getAlert$()
            .subscribe(function (message) {
            _this.message = message;
        });
        this.subscription = this.alertService.getAlert$()
            .pipe(operators_1.debounceTime(5000))
            .subscribe(function () { _this.message = null; });
    };
    AlertComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AlertComponent = __decorate([
        core_1.Component({ selector: 'alert', templateUrl: 'alert.component.html' })
    ], AlertComponent);
    return AlertComponent;
}());
exports.AlertComponent = AlertComponent;
