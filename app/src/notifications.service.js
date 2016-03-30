System.register(["angular2/core"], function(exports_1, context_1) {
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
    var core_1, core_2;
    var NotificationsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            }],
        execute: function() {
            NotificationsService = (function () {
                function NotificationsService() {
                    this.emiter = new core_2.EventEmitter();
                }
                NotificationsService.prototype.set = function (notification, to) { this.emiter.emit({ command: 'set', notification: notification, add: to }); };
                ;
                NotificationsService.prototype.getChangeEmitter = function () { return this.emiter; };
                NotificationsService.prototype.success = function (title, content, override) { this.set({ title: title, content: content, type: 'success', override: override }, true); };
                NotificationsService.prototype.error = function (title, content, override) { this.set({ title: title, content: content, type: 'error', override: override }, true); };
                NotificationsService.prototype.alert = function (title, content, override) { this.set({ title: title, content: content, type: 'alert', override: override }, true); };
                NotificationsService.prototype.info = function (title, content, override) { this.set({ title: title, content: content, type: 'info', override: override }, true); };
                NotificationsService.prototype.create = function (title, content, type, override) { this.set({ title: title, content: content, type: type, override: override }, true); };
                NotificationsService.prototype.html = function (html, type, override) { this.set({ html: html, type: type, override: override, title: null, content: null }, true); };
                NotificationsService.prototype.remove = function (id) {
                    if (id)
                        this.emiter.emit({ command: 'clean', id: id });
                    else
                        this.emiter.emit({ command: 'cleanAll' });
                };
                NotificationsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], NotificationsService);
                return NotificationsService;
            }());
            exports_1("NotificationsService", NotificationsService);
        }
    }
});
