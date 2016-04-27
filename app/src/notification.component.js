System.register(["angular2/core", "./notifications.service", "./max.pipe", "./icons"], function(exports_1, context_1) {
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
    var core_1, notifications_service_1, max_pipe_1, icons_1;
    var NotificationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (notifications_service_1_1) {
                notifications_service_1 = notifications_service_1_1;
            },
            function (max_pipe_1_1) {
                max_pipe_1 = max_pipe_1_1;
            },
            function (icons_1_1) {
                icons_1 = icons_1_1;
            }],
        execute: function() {
            NotificationComponent = (function () {
                function NotificationComponent(_service) {
                    var _this = this;
                    this._service = _service;
                    this.icons = icons_1.Icons;
                    this.progressWidth = 0;
                    this.stopTime = false;
                    this.count = 0;
                    this.instance = function () {
                        _this.diff = (new Date().getTime() - _this.start) - (_this.count * _this.speed);
                        if (_this.count++ == _this.steps)
                            _this._service.set(_this.item, false);
                        else if (!_this.stopTime) {
                            if (_this.showProgressBar)
                                _this.progressWidth += 100 / _this.steps;
                            _this.timer = setTimeout(_this.instance, (_this.speed - _this.diff));
                        }
                    };
                }
                NotificationComponent.prototype.ngOnInit = function () {
                    if (this.item.override)
                        this.attachOverrides();
                    if (this.timeOut != 0)
                        this.startTimeOut();
                };
                NotificationComponent.prototype.startTimeOut = function () {
                    this.steps = this.timeOut / 10;
                    this.speed = this.timeOut / this.steps;
                    this.start = new Date().getTime();
                    this.timer = setTimeout(this.instance, this.speed);
                };
                NotificationComponent.prototype.onEnter = function () {
                    if (this.pauseOnHover)
                        this.stopTime = true;
                };
                NotificationComponent.prototype.onLeave = function () {
                    if (this.pauseOnHover) {
                        this.stopTime = false;
                        setTimeout(this.instance, (this.speed - this.diff));
                    }
                };
                NotificationComponent.prototype.setPosition = function () { return this.position != 0 ? this.position * 90 : 0; };
                NotificationComponent.prototype.removeSelf = function () { if (this.clickToClose)
                    this._service.set(this.item, false); };
                NotificationComponent.prototype.attachOverrides = function () {
                    var _this = this;
                    Object.keys(this.item.override).forEach(function (a) { return _this[a] = _this.item.override[a]; });
                };
                NotificationComponent.prototype.ngOnDestroy = function () { clearTimeout(this.timer); };
                NotificationComponent = __decorate([
                    core_1.Component({
                        selector: 'simple-notification',
                        inputs: [
                            'item',
                            'timeOut',
                            'position',
                            'clickToClose',
                            'maxLength',
                            'showProgressBar',
                            'pauseOnHover',
                            'theClass'
                        ],
                        pipes: [max_pipe_1.MaxPipe],
                        encapsulation: core_1.ViewEncapsulation.None,
                        template: "\n        <div class=\"simple-notification\"\n            (click)=\"removeSelf()\"\n            [class]=\"theClass\"\n            \n            [ngClass]=\"{\n                alert: item.type == 'alert', \n                error: item.type == 'error', \n                success: item.type == 'success', \n                info: item.type == 'info',\n                bare: item.type == 'bare'\n                }\"\n                \n            (mouseenter)=\"onEnter()\"\n            (mouseleave)=\"onLeave()\">\n\n            <div *ngIf=\"!item.html\">\n                <div class=\"title\">{{item.title}}</div>\n                <div class=\"content\">{{item.content | max:maxLength}}</div>\n                <div *ngIf=\"item.type != 'bare'\" [innerHTML]=\"icons[item.type]\"></div>\n            </div>\n            <div *ngIf=\"item.html\" [innerHTML]=\"item.html\"></div>\n\n            <div class=\"progress\" *ngIf=\"showProgressBar\">\n                <span [ngStyle]=\"{'width': progressWidth + '%'}\"></span>\n            </div>\n\n        </div>\n    ",
                        styles: ["\n        .simple-notification {\n            width: 100%;\n            padding: 10px 20px;\n            box-sizing: border-box;\n            position: relative;\n            float: left;\n            margin-bottom: 10px;\n            color: #fff;\n            cursor: pointer;\n            transition: all 0.5s;\n        }\n\n        .simple-notification .title {\n            margin: 0;\n            padding: 0;\n            line-height: 30px;\n            font-size: 20px;\n        }\n\n        .simple-notification svg {\n            position: absolute;\n            box-sizing: border-box;\n            top: 0;\n            right: 0;\n            width: auto;\n            height: 70px;\n            padding: 10px;\n            fill: #fff;\n        }\n\n        .simple-notification .content {\n            margin: 0;\n            font-size: 16px;\n            padding: 0 50px 0 0;\n            line-height: 20px;\n        }\n\n        .simple-notification.error { background: #F44336; }\n        .simple-notification.success { background: #8BC34A; }\n        .simple-notification.alert { background: #ffdb5b; }\n        .simple-notification.info { background: #03A9F4; }\n        .simple-notification.bare { color: #000; }\n\n        .simple-notification .progress {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 5px;\n        }\n\n        .simple-notification .progress span {\n            float: left;\n            height: 100%;\n        }\n\n        .simple-notification.success .progress span { background: #689F38; }\n        .simple-notification.error .progress span { background: #D32F2F; }\n        .simple-notification.alert .progress span { background: #edc242; }\n        .simple-notification.info .progress span { background: #0288D1; }\n        .simple-notification.bare .progress span { background: #ccc; }\n    "]
                    }), 
                    __metadata('design:paramtypes', [notifications_service_1.NotificationsService])
                ], NotificationComponent);
                return NotificationComponent;
            }());
            exports_1("NotificationComponent", NotificationComponent);
        }
    }
});
