System.register(["angular2/core", "./notifications.service", "./notification.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, notifications_service_1, notification_component_1;
    var NotificationsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (notifications_service_1_1) {
                notifications_service_1 = notifications_service_1_1;
            },
            function (notification_component_1_1) {
                notification_component_1 = notification_component_1_1;
            }],
        execute: function() {
            NotificationsComponent = (function () {
                function NotificationsComponent(_service) {
                    this._service = _service;
                    this.notifications = [];
                    this.lastOnBottom = true;
                    this.maxStack = 8;
                    this.preventLastDuplicates = false;
                    this.preventDuplicates = false;
                    this.timeOut = 0;
                    this.maxLength = 0;
                    this.clickToClose = true;
                    this.showProgressBar = false;
                    this.pauseOnHover = true;
                    this.onCreate = new core_1.EventEmitter();
                    this.onDestroy = new core_1.EventEmitter();
                }
                NotificationsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.listener = this._service.getChangeEmitter()
                        .subscribe(function (item) {
                        if (item == 'clean')
                            _this.notifications = [];
                        else if (item.add)
                            _this.add(item.notification);
                        else {
                            _this.notifications.splice(_this.notifications.indexOf(item.notification), 1);
                            _this.onDestroy.emit(_this.buildEmit(item.notification, false));
                        }
                    });
                    this.attachChanges();
                };
                NotificationsComponent.prototype.add = function (item) {
                    item.createdOn = new Date();
                    item.id = Math.random().toString(36).substring(3);
                    var toBlock = this.preventLastDuplicates || this.preventDuplicates ? this.block(item) : false;
                    if (!toBlock) {
                        if (this.lastOnBottom) {
                            if (this.notifications.length >= this.maxStack)
                                this.notifications.splice(0, 1);
                            this.notifications.push(item);
                        }
                        else {
                            if (this.notifications.length >= this.maxStack)
                                this.notifications.splice(this.notifications.length - 1, 1);
                            this.notifications.splice(0, 0, item);
                        }
                        this.onCreate.emit(this.buildEmit(item, true));
                    }
                };
                NotificationsComponent.prototype.block = function (item) {
                    if (this.preventDuplicates && this.notifications.length > 0)
                        for (var i = 0; i < this.notifications.length; i++)
                            if (this.notifications[i].type == item.type && this.notifications[i].title == item.title && this.notifications[i].content == item.content)
                                return true;
                    if (this.preventLastDuplicates && this.notifications.length > 0) {
                        if (this.lastOnBottom)
                            return this.notifications[this.notifications.length - 1].type == item.type && this.notifications[this.notifications.length - 1].title == item.title && this.notifications[this.notifications.length - 1].content == item.content;
                        else
                            return this.notifications[0].type == item.type && this.notifications[0].title == item.title && this.notifications[0].content == item.content;
                    }
                    return false;
                };
                NotificationsComponent.prototype.attachChanges = function () {
                    var _this = this;
                    var keys = Object.keys(this.options);
                    keys.forEach(function (a) {
                        switch (a) {
                            case 'lastOnBottom':
                                _this.lastOnBottom = _this.options.lastOnBottom;
                                break;
                            case 'maxStack':
                                _this.maxStack = _this.options.maxStack;
                                break;
                            case 'timeOut':
                                _this.timeOut = _this.options.timeOut;
                                break;
                            case 'clickToClose':
                                _this.clickToClose = _this.options.clickToClose;
                                break;
                            case 'maxLength':
                                _this.maxLength = _this.options.maxLength;
                                break;
                            case 'showProgressBar':
                                _this.showProgressBar = _this.options.showProgressBar;
                                break;
                            case 'pauseOnHover':
                                _this.pauseOnHover = _this.options.pauseOnHover;
                                break;
                            case 'preventDuplicates':
                                _this.preventDuplicates = _this.options.preventDuplicates;
                                break;
                            case 'preventLastDuplicates':
                                _this.preventLastDuplicates = _this.options.preventLastDuplicates;
                                break;
                            case 'theClass':
                                _this.theClass = _this.options.theClass;
                                break;
                        }
                    });
                };
                NotificationsComponent.prototype.buildEmit = function (notification, to) {
                    var toEmit = {
                        createdOn: notification.createdOn,
                        type: notification.type,
                        id: notification.id
                    };
                    if (notification.html)
                        toEmit.html = notification.html;
                    else {
                        toEmit.title = notification.title;
                        toEmit.content = notification.content;
                    }
                    if (!to)
                        toEmit.destroyedOn = new Date();
                    return toEmit;
                };
                NotificationsComponent.prototype.ngOnDestroy = function () { this.listener.unsubscribe(); };
                NotificationsComponent = __decorate([
                    core_1.Component({
                        selector: 'simple-notifications',
                        directives: [notification_component_1.NotificationComponent],
                        inputs: ['options'],
                        outputs: ['onCreate', 'onDestroy'],
                        encapsulation: core_1.ViewEncapsulation.Native,
                        template: "\n        <div class=\"notification-wrapper\">\n            <simple-notification\n                *ngFor=\"#a of notifications; #i = index\"\n                [item]=\"a\"\n                [timeOut]=\"timeOut\"\n                [clickToClose]=\"clickToClose\"\n                [maxLength]=\"maxLength\"\n                [showProgressBar]=\"showProgressBar\"\n                [pauseOnHover]=\"pauseOnHover\"\n                [theClass]=\"theClass\"\n                [position]=\"i\">\n\n            </simple-notification>\n        </div>\n    ",
                        styles: ["\n        .notification-wrapper {\n            position: fixed;\n            bottom: 20px;\n            right: 20px;\n            width: 300px;\n            z-index: 1000;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [notifications_service_1.NotificationsService])
                ], NotificationsComponent);
                return NotificationsComponent;
            })();
            exports_1("NotificationsComponent", NotificationsComponent);
        }
    }
});
