var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var browser_1 = require('angular2/platform/browser');
var components_1 = require("angular2-notifications/components");
var components_2 = require("angular2-notifications/components");
var AppComponent = (function () {
    function AppComponent(_service) {
        this._service = _service;
        this.title = 'just a title';
        this.content = 'just content';
        this.type = 'success';
        this.temp = [true, false];
        this.options = {
            timeOut: 6000,
            lastOnBottom: true,
            clickToClose: true,
            maxLength: 0,
            maxStack: 3,
            showProgressBar: true
        };
    }
    AppComponent.prototype.create = function () {
        switch (this.type) {
            case 'success':
                this._service.success(this.title, this.content);
                break;
            case 'alert':
                this._service.alert(this.title, this.content);
                break;
            case 'error':
                this._service.error(this.title, this.content);
                break;
        }
    };
    AppComponent.prototype.withOverride = function () {
        this._service.set({ title: 'pero', content: 'peric', type: 'success', override: { timeOut: 300, clickToClose: false, maxLength: 3 } }, true);
    };
    AppComponent.prototype.removeAll = function () { this._service.removeAll(); };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            directives: [components_1.NotificationsComponent],
            providers: [components_2.NotificationsService],
            template: "\n        <form (ngSubmit)=\"create()\">\n            <div>\n                <label>Title</label>\n                <p>The title of the notification.</p>\n                <input type=\"text\" [(ngModel)]=\"title\">\n            </div>\n            <div>\n                <label>Content</label>\n                <p>The content of the notification.</p>\n                <input type=\"text\" [(ngModel)]=\"content\">\n            </div>\n            <div>\n                <label>Type</label>\n                <p>The type of the notification.</p>\n                <select [(ngModel)]=\"type\">\n                    <option value=\"success\" selected>Success</option>\n                    <option value=\"error\">Error</option>\n                    <option value=\"alert\">Alert</option>\n                </select>\n            </div>\n            <button type=\"submit\">Create Notification</button>\n        </form>\n        <button (click)=\"removeAll()\">Clean all notifications</button>\n        <simple-notifications [options]=\"options\"></simple-notifications>\n        <button (click)=\"withOverride()\">with override</button>\n    "
        }), 
        __metadata('design:paramtypes', [components_2.NotificationsService])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
browser_1.bootstrap(AppComponent);
