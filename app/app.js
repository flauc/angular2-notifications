System.register(['@angular/core', 'notifications', '@angular/platform-browser-dynamic'], function(exports_1, context_1) {
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
    var core_1, notifications_1, platform_browser_dynamic_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (notifications_1_1) {
                notifications_1 = notifications_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
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
                            break;
                        case 'bare':
                            this._service.bare(this.title, this.content);
                            break;
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
                        moduleId: module.id,
                        selector: 'app',
                        template:'<simple-notifications [options]="options" (onCreate)="loger($event)" (onDestroy)="loger($event)"></simple-notifications><div class="container"><div class="row"><h1 class="center">Angular2 Notifications Library</h1><p class="center sub">A light and easy to use notifications library for Angular 2.</p></div><div class="row"><div class="columns six"><div class="row"><h3>Create a Notification</h3><p class="sub">Notifications created using this form will use the standard settings set in the component.</p><pre><code>\r\n                    public options = {\r\n                    timeOut: 5000,\r\n                    lastOnBottom: true,\r\n                    clickToClose: true,\r\n                    maxLength: 0,\r\n                    maxStack: 7,\r\n                    showProgressBar: true,\r\n                    pauseOnHover: true\r\n                    };\r\n                </code></pre><form (ngSubmit)="create()"><div class="row"><label for="type">Type</label><select class="u-full-width" [(ngModel)]="type" id="type"><option value="success" selected>Success</option><option value="error">Error</option><option value="alert">Alert</option><option value="info">Info</option><option value="bare">Bare</option><option value="html">HTML</option></select></div><div class="row" *ngIf="type != \'html\'"><label for="title">Title</label> <input type="text" id="title" class="u-full-width" [(ngModel)]="title"></div><div class="row"><label for="content" *ngIf="type == \'html\'">HTML</label> <label for="content" *ngIf="type != \'html\'">Message</label> <textarea class="u-full-width" id="content" [(ngModel)]="content"></textarea></div><div class="row"><div class="row"><button class="button-primary" type="submit">Create</button></div></div></form></div><div class="row"><p>You can also clear all notifications from with in the component by calling:</p></div><div class="row"><div class="columns four"><pre><code>this._service.remove()</code></pre></div></div><div class="row"><p>If you pass an id to the remove() method you can remove a single notification.</p></div><div class="row"><button (click)="removeAll()">Clear all notifications</button></div></div><div class="columns six"><div class="row"><h3>With overrides</h3><p class="sub">With this form you can create a notification with custom options.</p><form (ngSubmit)="override()"><div class="row"><div class="six columns"><label for="timeOut">Time Out</label> <input type="number" id="timeOut" class="u-full-width" [(ngModel)]="over.timeOut"></div><div class="six columns"><label for="maxLength">Maximum Length</label> <input type="number" id="maxLength" class="u-full-width" [(ngModel)]="over.maxLength"></div></div><div class="row"><div class="columns four"><input type="checkbox" [(ngModel)]="over.showProgressBar"> <span class="label-body">Show Progress Bar?</span></div><div class="columns four"><input type="checkbox" [(ngModel)]="over.clickToClose"> <span class="label-body">Click To Close?</span></div><div class="columns four"><input type="checkbox" [(ngModel)]="over.pauseOnHover"> <span class="label-body">Pause On Hover?</span></div></div><div class="row"><button class="button-primary" type="submit">Create</button></div></form></div><div class="row"><h3>Logs</h3><p>Keeps Track of all created and destroyed notifications. It uses the onCreate and onDestroy Event Emitters.</p><div class="logs" *ngIf="logs.length > 0"><div class="log" *ngFor="#log of logs" [ngClass]="{\'destroyed\': log.destroyedOn}"><span>{{log.title}}</span> <span>{{log.html}}</span> <span>CreatedOn: {{log.createdOn | date:\'mediumTime\'}}</span> <span *ngIf="log.destroyedOn">DestroyedOn: {{log.destroyedOn | date:\'mediumTime\'}}</span></div></div></div></div></div></div>',
                        directives: [notifications_1.SimpleNotificationsComponent],
                        providers: [notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof notifications_1.NotificationsService !== 'undefined' && notifications_1.NotificationsService) === 'function' && _a) || Object])
                ], AppComponent);
                return AppComponent;
                var _a;
            }());
            platform_browser_dynamic_1.bootstrap(AppComponent);
        }
    }
});
