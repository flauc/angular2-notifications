System.register(['angular2/core', 'angular2/platform/browser', "./src/notifications.component", "./src/notifications.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_1, notifications_component_1, notifications_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (notifications_component_1_1) {
                notifications_component_1 = notifications_component_1_1;
            },
            function (notifications_service_1_1) {
                notifications_service_1 = notifications_service_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            AppComponent = (function () {
                function AppComponent(_service) {
                    this._service = _service;
                    this.options = {
                        timeOut: 5000,
                        lastOnBottom: true,
                        clickToClose: true,
                        maxLength: 0,
                        maxStack: 7,
                        showProgressBar: true,
                        pauseOnHover: true
                    };
                    this.title = 'just a title';
                    this.content = 'just content';
                    this.type = 'success';
                    this.over = {
                        timeOut: 5000,
                        clickToClose: true,
                        maxLength: 100,
                        showProgressBar: true,
                        pauseOnHover: true
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
                AppComponent.prototype.removeAll = function () { this._service.removeAll(); };
                AppComponent.prototype.override = function () {
                    console.log(this.over);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: 'app/app.html',
                        directives: [notifications_component_1.NotificationsComponent],
                        providers: [notifications_service_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [notifications_service_1.NotificationsService])
                ], AppComponent);
                return AppComponent;
            })();
            browser_1.bootstrap(AppComponent);
        }
    }
});
