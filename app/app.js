System.register(['angular2/core', 'angular2/platform/browser', "./src/notifications.service", "./src/simpleNotifications.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_1, notifications_service_1, simpleNotifications_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (notifications_service_1_1) {
                notifications_service_1 = notifications_service_1_1;
            },
            function (simpleNotifications_component_1_1) {
                simpleNotifications_component_1 = simpleNotifications_component_1_1;
            }],
        execute: function() {
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
                        pauseOnHover: true,
                        preventDuplicates: false,
                        preventLastDuplicates: false
                    };
                    this.title = 'just a title';
                    this.content = 'just content';
                    this.type = 'success';
                    this.logs = [];
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
                        case 'info':
                            this._service.info(this.title, this.content);
                            break;
                        case 'html':
                            this._service.html(this.content, 'bare');
                    }
                };
                AppComponent.prototype.removeAll = function () { this._service.remove(); };
                AppComponent.prototype.override = function () {
                    this._service.set({
                        title: 'Override',
                        content: 'This notification has overridden options',
                        type: 'alert',
                        override: {
                            timeOut: this.over.timeOut,
                            clickToClose: this.over.clickToClose,
                            maxLength: this.over.maxLength,
                            showProgressBar: this.over.showProgressBar,
                            pauseOnHover: this.over.pauseOnHover
                        }
                    }, true);
                };
                AppComponent.prototype.loger = function (event) {
                    this.logs.push(event);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: 'app/app.html',
                        directives: [simpleNotifications_component_1.SimpleNotificationsComponent],
                        providers: [notifications_service_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [notifications_service_1.NotificationsService])
                ], AppComponent);
                return AppComponent;
            }());
            browser_1.bootstrap(AppComponent);
        }
    }
});
