var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var notifications_1 = require('notifications');
var browser_1 = require('angular2/platform/browser');
core_1.enableProdMode();
var AppComponent = (function () {
    function AppComponent() {
        this.test = 'test';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: 'app/app.html',
            directives: [notifications_1.NotificationsComponent],
            providers: [notifications_1.NotificationsService]
        })
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
browser_1.bootstrap(AppComponent);
//# sourceMappingURL=app.js.map