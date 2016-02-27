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
var notifications_service_1 = require("./notifications.service");
var alert_icon_1 = require("./icons/alert.icon");
var error_icon_1 = require("./icons/error.icon");
var success_icon_1 = require("./icons/success.icon");
var max_pipe_1 = require("./max.pipe");
var NotificationComponent = (function () {
    function NotificationComponent(_service) {
        var _this = this;
        this._service = _service;
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
        var keys = Object.keys(this.item.override);
        keys.forEach(function (a) {
            switch (a) {
                case 'timeOut':
                    _this.timeOut = _this.item.override.timeOut;
                    break;
                case 'clickToClose':
                    _this.clickToClose = _this.item.override.clickToClose;
                    break;
                case 'maxLength':
                    _this.maxLength = _this.item.override.maxLength;
                    break;
                case 'showProgressBar':
                    _this.showProgressBar = _this.item.override.showProgressBar;
                    break;
                case 'pauseOnHover':
                    _this.pauseOnHover = _this.item.override.pauseOnHover;
                    break;
                default:
                    console.error("no option with the key " + a + " exists");
                    break;
            }
        });
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
                'pauseOnHover'
            ],
            directives: [alert_icon_1.AlertIcon, error_icon_1.ErrorIcon, success_icon_1.SuccessIcon],
            pipes: [max_pipe_1.MaxPipe],
            template: "\n        <div class=\"notification\"\n            (click)=\"removeSelf()\"\n            [ngClass]=\"{alert: item.type == 'alert', error: item.type == 'error', success: item.type == 'success'}\"\n            (mouseenter)=\"onEnter()\"\n            (mouseleave)=\"onLeave()\">\n\n            <h3>{{item.title}}</h3>\n            <p>{{item.content | max:maxLength}}</p>\n\n            <alertIcon *ngIf=\"item.type == 'alert'\"></alertIcon>\n            <errorIcon *ngIf=\"item.type == 'error'\"></errorIcon>\n            <successIcon *ngIf=\"item.type == 'success'\"></successIcon>\n\n            <div class=\"progress\" *ngIf=\"showProgressBar\">\n                <span [ngStyle]=\"{'width': progressWidth + '%'}\"></span>\n            </div>\n\n        </div>\n    ",
            styles: ["\n        .notification {\n            width: 100%;\n            padding: 10px 20px;\n            box-sizing: border-box;\n            position: relative;\n            float: left;\n            margin-bottom: 10px;\n            color: #fff;\n            cursor: pointer;\n            transition: all 0.5s;\n        }\n\n        h3 {\n            margin: 0;\n            padding: 0;\n            line-height: 30px;\n        }\n\n        p {\n            margin: 0;\n            padding: 0 50px 0 0;\n            line-height: 20px;\n        }\n\n        .error { background: #ff6b6b; }\n        .success { background: #97fc8f; }\n        .alert { background: #ffdb5b; }\n\n        .progress {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 5px;\n        }\n\n        .progress span {\n            float: left;\n            height: 100%;\n        }\n\n        .success .progress span { background: #70ea62; }\n        .error .progress span { background: #e85555; }\n        .alert .progress span { background: #edc242; }\n    "]
        }), 
        __metadata('design:paramtypes', [notifications_service_1.NotificationsService])
    ], NotificationComponent);
    return NotificationComponent;
})();
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=notification.component.js.map