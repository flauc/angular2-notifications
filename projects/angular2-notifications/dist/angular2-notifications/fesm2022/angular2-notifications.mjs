import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i0 from '@angular/core';
import { EventEmitter, Injectable, Inject, TemplateRef, Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, InjectionToken, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import * as i2 from '@angular/platform-browser';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';

const DEFAULT_ICONS = {
    alert: `
        <svg class="simple-notification-svg" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
        </svg>
    `,
    error: `
        <svg class="simple-notification-svg" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
        </svg>
    `,
    info: `
        <svg class="simple-notification-svg" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
        </svg>
    `,
    success: `
        <svg class="simple-notification-svg" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
        </svg>
    `,
    warn: `
        <svg class="simple-notification-svg" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="64" viewBox="0 0 64 64" height="64">
          <circle cx="32.086" cy="50.142" r="2.256"/>
          <path d="M30.08 25.012V42.32c0 1.107.897 2.005 2.006 2.005s2.006-.897 2.006-2.005V25.012c0-1.107-.897-2.006-2.006-2.006s-2.006.898-2.006 2.006z"/>
          <path d="M63.766 59.234L33.856 3.082c-.697-1.308-2.844-1.308-3.54 0L.407 59.234c-.331.622-.312 1.372.051 1.975.362.605 1.015.975 1.72.975h59.816c.705 0 1.357-.369 1.721-.975.361-.603.381-1.353.051-1.975zM5.519 58.172L32.086 8.291l26.568 49.881H5.519z"/>
        </svg>
    `
};

var NotificationType;
(function (NotificationType) {
    NotificationType["Success"] = "success";
    NotificationType["Error"] = "error";
    NotificationType["Alert"] = "alert";
    NotificationType["Info"] = "info";
    NotificationType["Warn"] = "warn";
    NotificationType["Bare"] = "bare";
})(NotificationType || (NotificationType = {}));

class NotificationsService {
    globalOptions;
    constructor(globalOptions) {
        this.globalOptions = globalOptions;
    }
    emitter = new Subject();
    icons = DEFAULT_ICONS;
    set(notification, to) {
        notification.id = notification.override && notification.override.id ?
            notification.override.id :
            Math.random().toString(36).substring(3);
        notification.click = new EventEmitter();
        notification.clickIcon = new EventEmitter();
        notification.timeoutEnd = new EventEmitter();
        this.emitter.next({ command: 'set', notification, add: to });
        return notification;
    }
    success(title = '', content = '', override, context) {
        return this.set({ title, content: content || '', type: NotificationType.Success, icon: this.icons.success, override, context }, true);
    }
    error(title = '', content = '', override, context) {
        return this.set({ title, content: content || '', type: NotificationType.Error, icon: this.icons.error, override, context }, true);
    }
    alert(title = '', content = '', override, context) {
        return this.set({ title, content: content || '', type: NotificationType.Alert, icon: this.icons.alert, override, context }, true);
    }
    info(title = '', content = '', override, context) {
        return this.set({ title, content: content || '', type: NotificationType.Info, icon: this.icons.info, override, context }, true);
    }
    warn(title = '', content = '', override, context) {
        return this.set({ title, content: content || '', type: NotificationType.Warn, icon: this.icons.warn, override, context }, true);
    }
    bare(title = '', content = '', override, context) {
        return this.set({ title, content: content || '', type: NotificationType.Bare, icon: 'bare', override, context }, true);
    }
    // With type method
    create(title = '', content = '', type = NotificationType.Success, override, context) {
        return this.set({ title, content, type, icon: this.icons[type], override, context }, true);
    }
    // HTML Notification method
    html(html, type = NotificationType.Success, override, icon = 'bare', context) {
        return this.set({ html, type, icon: this.icons[icon], override, context }, true);
    }
    // Remove all notifications method
    remove(id) {
        if (id) {
            this.emitter.next({ command: 'clean', id });
        }
        else {
            this.emitter.next({ command: 'cleanAll' });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: NotificationsService, deps: [{ token: 'options' }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: NotificationsService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: NotificationsService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['options']
                }] }]; } });

class NotificationComponent {
    notificationService;
    domSanitizer;
    cd;
    zone;
    timeOut;
    showProgressBar;
    pauseOnHover;
    clickToClose;
    clickIconToClose;
    maxLength;
    theClass;
    rtl;
    animate;
    position;
    item;
    // Progress bar variables
    title;
    content;
    titleIsTemplate = false;
    contentIsTemplate = false;
    htmlIsTemplate = false;
    progressWidth = 0;
    safeSvg;
    safeInputHtml;
    stopTime = false;
    timer;
    framesPerSecond = 40;
    sleepTime;
    startTime;
    endTime;
    pauseStart;
    icon;
    constructor(notificationService, domSanitizer, cd, zone) {
        this.notificationService = notificationService;
        this.domSanitizer = domSanitizer;
        this.cd = cd;
        this.zone = zone;
    }
    ngOnInit() {
        if (this.item.override) {
            this.attachOverrides();
        }
        if (this.animate) {
            this.item.state = this.animate;
        }
        if (this.timeOut !== 0) {
            this.startTimeOut();
        }
        this.contentType(this.item.title, 'title');
        this.contentType(this.item.content, 'content');
        this.contentType(this.item.html, 'html');
        this.safeSvg = this.domSanitizer.bypassSecurityTrustHtml(this.icon || this.item.icon);
        this.safeInputHtml = this.domSanitizer.bypassSecurityTrustHtml(this.item.html);
    }
    ngOnDestroy() {
        clearTimeout(this.timer);
        this.cd.detach();
    }
    startTimeOut() {
        this.sleepTime = 1000 / this.framesPerSecond /* ms */;
        this.startTime = new Date().getTime();
        this.endTime = this.startTime + this.timeOut;
        this.zone.runOutsideAngular(() => this.timer = setTimeout(this.instance, this.sleepTime));
    }
    onEnter() {
        if (this.pauseOnHover) {
            this.stopTime = true;
            this.pauseStart = new Date().getTime();
        }
    }
    onLeave() {
        if (this.pauseOnHover) {
            this.stopTime = false;
            this.startTime += (new Date().getTime() - this.pauseStart);
            this.endTime += (new Date().getTime() - this.pauseStart);
            this.zone.runOutsideAngular(() => setTimeout(this.instance, this.sleepTime));
        }
    }
    onClick(event) {
        this.item.click.emit(event);
        if (this.clickToClose) {
            this.remove();
        }
    }
    onClickIcon(event) {
        this.item.clickIcon.emit(event);
        if (this.clickIconToClose) {
            this.remove();
        }
    }
    // Attach all the overrides
    attachOverrides() {
        Object.keys(this.item.override).forEach(a => {
            if (this.hasOwnProperty(a)) {
                this[a] = this.item.override[a];
            }
        });
    }
    instance = () => {
        const now = new Date().getTime();
        if (this.endTime < now) {
            this.remove();
            this.item.timeoutEnd.emit();
        }
        else if (!this.stopTime) {
            if (this.showProgressBar) {
                // We add this.sleepTime just to have 100% before close
                this.progressWidth = Math.min((now - this.startTime + this.sleepTime) * 100 / this.timeOut, 100);
            }
            this.timer = setTimeout(this.instance, this.sleepTime);
        }
        this.zone.run(() => {
            if (!this.cd.destroyed) {
                this.cd.detectChanges();
            }
        });
    };
    remove() {
        if (this.animate) {
            this.item.state = this.animate + 'Out';
            setTimeout(() => {
                this.notificationService.set(this.item, false);
            }, 310);
        }
        else {
            this.notificationService.set(this.item, false);
        }
    }
    contentType(item, key) {
        if (item instanceof TemplateRef) {
            this[key] = item;
        }
        else {
            this[key] = this.domSanitizer.bypassSecurityTrustHtml(item);
        }
        this[key + 'IsTemplate'] = item instanceof TemplateRef;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: NotificationComponent, deps: [{ token: NotificationsService }, { token: i2.DomSanitizer }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: NotificationComponent, selector: "simple-notification", inputs: { timeOut: "timeOut", showProgressBar: "showProgressBar", pauseOnHover: "pauseOnHover", clickToClose: "clickToClose", clickIconToClose: "clickIconToClose", maxLength: "maxLength", theClass: "theClass", rtl: "rtl", animate: "animate", position: "position", item: "item" }, ngImport: i0, template: "<div class=\"simple-notification\"\r\n     [@enterLeave]=\"item.state\"\r\n     (click)=\"onClick($event)\"\r\n     [class]=\"theClass\"\r\n     [ngClass]=\"{\r\n            'alert': item.type === 'alert',\r\n            'error': item.type === 'error',\r\n            'warn': item.type === 'warn',\r\n            'success': item.type === 'success',\r\n            'info': item.type === 'info',\r\n            'bare': item.type === 'bare',\r\n            'rtl-mode': rtl,\r\n            'has-icon': item.icon !== 'bare'\r\n        }\"\r\n     (mouseenter)=\"onEnter()\"\r\n     (mouseleave)=\"onLeave()\">\r\n\r\n    <div *ngIf=\"!item.html\">\r\n\r\n        <div class=\"sn-title\" *ngIf=\"titleIsTemplate; else regularTitle\">\r\n            <ng-container *ngTemplateOutlet=\"title; context: item.context\"></ng-container>\r\n        </div>\r\n\r\n        <ng-template #regularTitle>\r\n            <div class=\"sn-title\" [innerHTML]=\"title\"></div>\r\n        </ng-template>\r\n\r\n        <div class=\"sn-content\" *ngIf=\"contentIsTemplate else regularContent\">\r\n            <ng-container *ngTemplateOutlet=\"content; context: item.context\"></ng-container>\r\n        </div>\r\n\r\n        <ng-template #regularContent>\r\n            <div class=\"sn-content\" [innerHTML]=\"content\"></div>\r\n        </ng-template>\r\n\r\n        <div class=\"icon\" *ngIf=\"item.icon !== 'bare'\" [innerHTML]=\"safeSvg\"></div>\r\n    </div>\r\n    <div *ngIf=\"item.html\">\r\n        <div class=\"sn-html\" *ngIf=\"htmlIsTemplate; else regularHtml\">\r\n            <ng-container *ngTemplateOutlet=\"item.html; context: item.context\"></ng-container>\r\n        </div>\r\n\r\n        <ng-template #regularHtml>\r\n            <div class=\"sn-content\" [innerHTML]=\"safeInputHtml\"></div>\r\n        </ng-template>\r\n\r\n        <div class=\"icon\" [class.icon-hover]=\"clickIconToClose\" *ngIf=\"item.icon\" [innerHTML]=\"safeSvg\" (click)=\"onClickIcon($event)\"></div>\r\n    </div>\r\n\r\n    <div class=\"sn-progress-loader\" *ngIf=\"showProgressBar\">\r\n        <span [ngStyle]=\"{'width': progressWidth + '%'}\"></span>\r\n    </div>\r\n\r\n</div>\r\n", styles: [".simple-notification{width:100%;padding:10px 20px;box-sizing:border-box;position:relative;float:left;margin-bottom:10px;color:#fff;cursor:pointer;transition:all .5s;min-height:70px}.simple-notification .sn-title,.simple-notification .sn-content,.simple-notification .sn-html{margin:0}.simple-notification .sn-title{line-height:30px;font-size:20px}.simple-notification .sn-content{font-size:16px;line-height:20px}.simple-notification.has-icon .sn-title,.simple-notification.has-icon .sn-content,.simple-notification.has-icon .sn-html{padding:0 50px 0 0}.simple-notification .icon{position:absolute;box-sizing:border-box;top:0;right:0;width:70px;height:70px;padding:10px}.simple-notification .icon.icon-hover:hover{opacity:.5}.simple-notification .icon svg{fill:#fff;width:100%;height:100%}.simple-notification .icon svg g{fill:#fff}.simple-notification.rtl-mode.has-icon .sn-title,.simple-notification.rtl-mode.has-icon .sn-content,.simple-notification.rtl-mode.has-icon .sn-html{padding:0 0 0 50px}.simple-notification.rtl-mode{direction:rtl}.simple-notification.rtl-mode .sn-content{padding:0 0 0 50px}.simple-notification.rtl-mode svg{left:0;right:auto}.simple-notification.error{background:#F44336}.simple-notification.success{background:#8BC34A}.simple-notification.alert{background:#ffdb5b}.simple-notification.info{background:#03A9F4}.simple-notification.warn{background:#ffdb5b}.simple-notification .sn-progress-loader{position:absolute;top:0;left:0;width:100%;height:5px}.simple-notification .sn-progress-loader span{float:left;height:100%}.simple-notification.success .sn-progress-loader span{background:#689F38}.simple-notification.error .sn-progress-loader span{background:#D32F2F}.simple-notification.alert .sn-progress-loader span{background:#edc242}.simple-notification.info .sn-progress-loader span{background:#0288D1}.simple-notification.warn .sn-progress-loader span{background:#edc242}.simple-notification.bare .sn-progress-loader span{background:#ccc}.simple-notification.warn div .sn-title,.simple-notification.warn div .sn-content,.simple-notification.warn div .sn-html{color:#444}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
            trigger('enterLeave', [
                // Fade
                state('fade', style({ opacity: 1 })),
                transition('* => fade', [
                    style({ opacity: 0 }),
                    animate('400ms ease-in-out')
                ]),
                state('fadeOut', style({ opacity: 0 })),
                transition('fade => fadeOut', [
                    style({ opacity: 1 }),
                    animate('300ms ease-in-out')
                ]),
                // Enter from top
                state('fromTop', style({ opacity: 1, transform: 'translateY(0)' })),
                transition('* => fromTop', [
                    style({ opacity: 0, transform: 'translateY(-5%)' }),
                    animate('400ms ease-in-out')
                ]),
                state('fromTopOut', style({ opacity: 0, transform: 'translateY(5%)' })),
                transition('fromTop => fromTopOut', [
                    style({ opacity: 1, transform: 'translateY(0)' }),
                    animate('300ms ease-in-out')
                ]),
                // Enter from right
                state('fromRight', style({ opacity: 1, transform: 'translateX(0)' })),
                transition('* => fromRight', [
                    style({ opacity: 0, transform: 'translateX(5%)' }),
                    animate('400ms ease-in-out')
                ]),
                state('fromRightOut', style({ opacity: 0, transform: 'translateX(-5%)' })),
                transition('fromRight => fromRightOut', [
                    style({ opacity: 1, transform: 'translateX(0)' }),
                    animate('300ms ease-in-out')
                ]),
                // Enter from bottom
                state('fromBottom', style({ opacity: 1, transform: 'translateY(0)' })),
                transition('* => fromBottom', [
                    style({ opacity: 0, transform: 'translateY(5%)' }),
                    animate('400ms ease-in-out')
                ]),
                state('fromBottomOut', style({ opacity: 0, transform: 'translateY(-5%)' })),
                transition('fromBottom => fromBottomOut', [
                    style({ opacity: 1, transform: 'translateY(0)' }),
                    animate('300ms ease-in-out')
                ]),
                // Enter from left
                state('fromLeft', style({ opacity: 1, transform: 'translateX(0)' })),
                transition('* => fromLeft', [
                    style({ opacity: 0, transform: 'translateX(-5%)' }),
                    animate('400ms ease-in-out')
                ]),
                state('fromLeftOut', style({ opacity: 0, transform: 'translateX(5%)' })),
                transition('fromLeft => fromLeftOut', [
                    style({ opacity: 1, transform: 'translateX(0)' }),
                    animate('300ms ease-in-out')
                ]),
                // Rotate
                state('scale', style({ opacity: 1, transform: 'scale(1)' })),
                transition('* => scale', [
                    style({ opacity: 0, transform: 'scale(0)' }),
                    animate('400ms ease-in-out')
                ]),
                state('scaleOut', style({ opacity: 0, transform: 'scale(0)' })),
                transition('scale => scaleOut', [
                    style({ opacity: 1, transform: 'scale(1)' }),
                    animate('400ms ease-in-out')
                ]),
                // Scale
                state('rotate', style({ opacity: 1, transform: 'rotate(0deg)' })),
                transition('* => rotate', [
                    style({ opacity: 0, transform: 'rotate(5deg)' }),
                    animate('400ms ease-in-out')
                ]),
                state('rotateOut', style({ opacity: 0, transform: 'rotate(-5deg)' })),
                transition('rotate => rotateOut', [
                    style({ opacity: 1, transform: 'rotate(0deg)' }),
                    animate('400ms ease-in-out')
                ])
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: NotificationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'simple-notification', encapsulation: ViewEncapsulation.None, animations: [
                        trigger('enterLeave', [
                            // Fade
                            state('fade', style({ opacity: 1 })),
                            transition('* => fade', [
                                style({ opacity: 0 }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fadeOut', style({ opacity: 0 })),
                            transition('fade => fadeOut', [
                                style({ opacity: 1 }),
                                animate('300ms ease-in-out')
                            ]),
                            // Enter from top
                            state('fromTop', style({ opacity: 1, transform: 'translateY(0)' })),
                            transition('* => fromTop', [
                                style({ opacity: 0, transform: 'translateY(-5%)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fromTopOut', style({ opacity: 0, transform: 'translateY(5%)' })),
                            transition('fromTop => fromTopOut', [
                                style({ opacity: 1, transform: 'translateY(0)' }),
                                animate('300ms ease-in-out')
                            ]),
                            // Enter from right
                            state('fromRight', style({ opacity: 1, transform: 'translateX(0)' })),
                            transition('* => fromRight', [
                                style({ opacity: 0, transform: 'translateX(5%)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fromRightOut', style({ opacity: 0, transform: 'translateX(-5%)' })),
                            transition('fromRight => fromRightOut', [
                                style({ opacity: 1, transform: 'translateX(0)' }),
                                animate('300ms ease-in-out')
                            ]),
                            // Enter from bottom
                            state('fromBottom', style({ opacity: 1, transform: 'translateY(0)' })),
                            transition('* => fromBottom', [
                                style({ opacity: 0, transform: 'translateY(5%)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fromBottomOut', style({ opacity: 0, transform: 'translateY(-5%)' })),
                            transition('fromBottom => fromBottomOut', [
                                style({ opacity: 1, transform: 'translateY(0)' }),
                                animate('300ms ease-in-out')
                            ]),
                            // Enter from left
                            state('fromLeft', style({ opacity: 1, transform: 'translateX(0)' })),
                            transition('* => fromLeft', [
                                style({ opacity: 0, transform: 'translateX(-5%)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('fromLeftOut', style({ opacity: 0, transform: 'translateX(5%)' })),
                            transition('fromLeft => fromLeftOut', [
                                style({ opacity: 1, transform: 'translateX(0)' }),
                                animate('300ms ease-in-out')
                            ]),
                            // Rotate
                            state('scale', style({ opacity: 1, transform: 'scale(1)' })),
                            transition('* => scale', [
                                style({ opacity: 0, transform: 'scale(0)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('scaleOut', style({ opacity: 0, transform: 'scale(0)' })),
                            transition('scale => scaleOut', [
                                style({ opacity: 1, transform: 'scale(1)' }),
                                animate('400ms ease-in-out')
                            ]),
                            // Scale
                            state('rotate', style({ opacity: 1, transform: 'rotate(0deg)' })),
                            transition('* => rotate', [
                                style({ opacity: 0, transform: 'rotate(5deg)' }),
                                animate('400ms ease-in-out')
                            ]),
                            state('rotateOut', style({ opacity: 0, transform: 'rotate(-5deg)' })),
                            transition('rotate => rotateOut', [
                                style({ opacity: 1, transform: 'rotate(0deg)' }),
                                animate('400ms ease-in-out')
                            ])
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"simple-notification\"\r\n     [@enterLeave]=\"item.state\"\r\n     (click)=\"onClick($event)\"\r\n     [class]=\"theClass\"\r\n     [ngClass]=\"{\r\n            'alert': item.type === 'alert',\r\n            'error': item.type === 'error',\r\n            'warn': item.type === 'warn',\r\n            'success': item.type === 'success',\r\n            'info': item.type === 'info',\r\n            'bare': item.type === 'bare',\r\n            'rtl-mode': rtl,\r\n            'has-icon': item.icon !== 'bare'\r\n        }\"\r\n     (mouseenter)=\"onEnter()\"\r\n     (mouseleave)=\"onLeave()\">\r\n\r\n    <div *ngIf=\"!item.html\">\r\n\r\n        <div class=\"sn-title\" *ngIf=\"titleIsTemplate; else regularTitle\">\r\n            <ng-container *ngTemplateOutlet=\"title; context: item.context\"></ng-container>\r\n        </div>\r\n\r\n        <ng-template #regularTitle>\r\n            <div class=\"sn-title\" [innerHTML]=\"title\"></div>\r\n        </ng-template>\r\n\r\n        <div class=\"sn-content\" *ngIf=\"contentIsTemplate else regularContent\">\r\n            <ng-container *ngTemplateOutlet=\"content; context: item.context\"></ng-container>\r\n        </div>\r\n\r\n        <ng-template #regularContent>\r\n            <div class=\"sn-content\" [innerHTML]=\"content\"></div>\r\n        </ng-template>\r\n\r\n        <div class=\"icon\" *ngIf=\"item.icon !== 'bare'\" [innerHTML]=\"safeSvg\"></div>\r\n    </div>\r\n    <div *ngIf=\"item.html\">\r\n        <div class=\"sn-html\" *ngIf=\"htmlIsTemplate; else regularHtml\">\r\n            <ng-container *ngTemplateOutlet=\"item.html; context: item.context\"></ng-container>\r\n        </div>\r\n\r\n        <ng-template #regularHtml>\r\n            <div class=\"sn-content\" [innerHTML]=\"safeInputHtml\"></div>\r\n        </ng-template>\r\n\r\n        <div class=\"icon\" [class.icon-hover]=\"clickIconToClose\" *ngIf=\"item.icon\" [innerHTML]=\"safeSvg\" (click)=\"onClickIcon($event)\"></div>\r\n    </div>\r\n\r\n    <div class=\"sn-progress-loader\" *ngIf=\"showProgressBar\">\r\n        <span [ngStyle]=\"{'width': progressWidth + '%'}\"></span>\r\n    </div>\r\n\r\n</div>\r\n", styles: [".simple-notification{width:100%;padding:10px 20px;box-sizing:border-box;position:relative;float:left;margin-bottom:10px;color:#fff;cursor:pointer;transition:all .5s;min-height:70px}.simple-notification .sn-title,.simple-notification .sn-content,.simple-notification .sn-html{margin:0}.simple-notification .sn-title{line-height:30px;font-size:20px}.simple-notification .sn-content{font-size:16px;line-height:20px}.simple-notification.has-icon .sn-title,.simple-notification.has-icon .sn-content,.simple-notification.has-icon .sn-html{padding:0 50px 0 0}.simple-notification .icon{position:absolute;box-sizing:border-box;top:0;right:0;width:70px;height:70px;padding:10px}.simple-notification .icon.icon-hover:hover{opacity:.5}.simple-notification .icon svg{fill:#fff;width:100%;height:100%}.simple-notification .icon svg g{fill:#fff}.simple-notification.rtl-mode.has-icon .sn-title,.simple-notification.rtl-mode.has-icon .sn-content,.simple-notification.rtl-mode.has-icon .sn-html{padding:0 0 0 50px}.simple-notification.rtl-mode{direction:rtl}.simple-notification.rtl-mode .sn-content{padding:0 0 0 50px}.simple-notification.rtl-mode svg{left:0;right:auto}.simple-notification.error{background:#F44336}.simple-notification.success{background:#8BC34A}.simple-notification.alert{background:#ffdb5b}.simple-notification.info{background:#03A9F4}.simple-notification.warn{background:#ffdb5b}.simple-notification .sn-progress-loader{position:absolute;top:0;left:0;width:100%;height:5px}.simple-notification .sn-progress-loader span{float:left;height:100%}.simple-notification.success .sn-progress-loader span{background:#689F38}.simple-notification.error .sn-progress-loader span{background:#D32F2F}.simple-notification.alert .sn-progress-loader span{background:#edc242}.simple-notification.info .sn-progress-loader span{background:#0288D1}.simple-notification.warn .sn-progress-loader span{background:#edc242}.simple-notification.bare .sn-progress-loader span{background:#ccc}.simple-notification.warn div .sn-title,.simple-notification.warn div .sn-content,.simple-notification.warn div .sn-html{color:#444}\n"] }]
        }], ctorParameters: function () { return [{ type: NotificationsService }, { type: i2.DomSanitizer }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { timeOut: [{
                type: Input
            }], showProgressBar: [{
                type: Input
            }], pauseOnHover: [{
                type: Input
            }], clickToClose: [{
                type: Input
            }], clickIconToClose: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], theClass: [{
                type: Input
            }], rtl: [{
                type: Input
            }], animate: [{
                type: Input
            }], position: [{
                type: Input
            }], item: [{
                type: Input
            }] } });

var NotificationAnimationType;
(function (NotificationAnimationType) {
    NotificationAnimationType["Fade"] = "fade";
    NotificationAnimationType["FromTop"] = "fromTop";
    NotificationAnimationType["FromRight"] = "fromRight";
    NotificationAnimationType["FromBottom"] = "fromBottom";
    NotificationAnimationType["FromLeft"] = "fromLeft";
    NotificationAnimationType["Scale"] = "scale";
    NotificationAnimationType["Rotate"] = "rotate";
})(NotificationAnimationType || (NotificationAnimationType = {}));

class SimpleNotificationsComponent {
    service;
    cd;
    constructor(service, cd) {
        this.service = service;
        this.cd = cd;
    }
    set options(opt) {
        this.usingComponentOptions = true;
        this.attachChanges(opt);
    }
    create = new EventEmitter();
    destroy = new EventEmitter();
    notifications = [];
    position = ['bottom', 'right'];
    lastNotificationCreated;
    listener;
    // Received values
    lastOnBottom = true;
    maxStack = 8;
    preventLastDuplicates = false;
    preventDuplicates = false;
    // Sent values
    timeOut = 0;
    maxLength = 0;
    clickToClose = true;
    clickIconToClose = false;
    showProgressBar = true;
    pauseOnHover = true;
    theClass = '';
    rtl = false;
    animate = NotificationAnimationType.FromRight;
    usingComponentOptions = false;
    ngOnInit() {
        /**
         * Only attach global options if config
         * options were never sent through input
         */
        if (!this.usingComponentOptions) {
            this.attachChanges(this.service.globalOptions);
        }
        this.listener = this.service.emitter
            .subscribe(item => {
            switch (item.command) {
                case 'cleanAll':
                    this.notifications = [];
                    break;
                case 'clean':
                    this.cleanSingle(item.id);
                    break;
                case 'set':
                    if (item.add) {
                        this.add(item.notification);
                    }
                    else {
                        this.defaultBehavior(item);
                    }
                    break;
                default:
                    this.defaultBehavior(item);
                    break;
            }
            if (!this.cd.destroyed) {
                this.cd.detectChanges();
            }
        });
    }
    ngOnDestroy() {
        if (this.listener) {
            this.listener.unsubscribe();
        }
        this.cd.detach();
    }
    // Default behavior on event
    defaultBehavior(value) {
        this.notifications.splice(this.notifications.indexOf(value.notification), 1);
        this.destroy.emit(this.buildEmit(value.notification, false));
    }
    // Add the new notification to the notification array
    add(item) {
        item.createdOn = new Date();
        const toBlock = this.preventLastDuplicates || this.preventDuplicates ? this.block(item) : false;
        // Save this as the last created notification
        this.lastNotificationCreated = item;
        // Override icon if set
        if (item.override && item.override.icons && item.override.icons[item.type]) {
            item.icon = item.override.icons[item.type];
        }
        if (!toBlock) {
            // Check if the notification should be added at the start or the end of the array
            if (this.lastOnBottom) {
                if (this.notifications.length >= this.maxStack) {
                    this.notifications.splice(0, 1);
                }
                this.notifications.push(item);
            }
            else {
                if (this.notifications.length >= this.maxStack) {
                    this.notifications.splice(this.notifications.length - 1, 1);
                }
                this.notifications.splice(0, 0, item);
            }
            this.create.emit(this.buildEmit(item, true));
        }
    }
    // Check if notifications should be prevented
    block(item) {
        const toCheck = item.html ? this.checkHtml : this.checkStandard;
        if (this.preventDuplicates && this.notifications.length > 0) {
            for (const notification of this.notifications) {
                if (toCheck(notification, item)) {
                    return true;
                }
            }
        }
        if (this.preventLastDuplicates) {
            let comp;
            if (this.preventLastDuplicates === 'visible' && this.notifications.length > 0) {
                if (this.lastOnBottom) {
                    comp = this.notifications[this.notifications.length - 1];
                }
                else {
                    comp = this.notifications[0];
                }
            }
            else if (this.preventLastDuplicates === 'all' && this.lastNotificationCreated) {
                comp = this.lastNotificationCreated;
            }
            else {
                return false;
            }
            return toCheck(comp, item);
        }
        return false;
    }
    checkStandard(checker, item) {
        return checker.type === item.type && checker.title === item.title && checker.content === item.content;
    }
    checkHtml(checker, item) {
        return checker.html ?
            checker.type === item.type && checker.title === item.title && checker.content === item.content && checker.html === item.html :
            false;
    }
    // Attach all the changes received in the options object
    attachChanges(options) {
        for (const key in options) {
            if (this.hasOwnProperty(key)) {
                this[key] = options[key];
            }
            else if (key === 'icons') {
                this.service.icons = options[key];
            }
        }
    }
    buildEmit(notification, to) {
        const toEmit = {
            createdOn: notification.createdOn,
            type: notification.type,
            icon: notification.icon,
            id: notification.id
        };
        if (notification.html) {
            toEmit.html = notification.html;
        }
        else {
            toEmit.title = notification.title;
            toEmit.content = notification.content;
        }
        if (!to) {
            toEmit.destroyedOn = new Date();
        }
        return toEmit;
    }
    cleanSingle(id) {
        let indexOfDelete = 0;
        let doDelete = false;
        let noti;
        this.notifications.forEach((notification, idx) => {
            if (notification.id === id) {
                indexOfDelete = idx;
                noti = notification;
                doDelete = true;
            }
        });
        if (doDelete) {
            this.notifications.splice(indexOfDelete, 1);
            this.destroy.emit(this.buildEmit(noti, false));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: SimpleNotificationsComponent, deps: [{ token: NotificationsService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: SimpleNotificationsComponent, selector: "simple-notifications", inputs: { options: "options" }, outputs: { create: "create", destroy: "destroy" }, ngImport: i0, template: "<div class=\"simple-notification-wrapper\" [ngClass]=\"position\">\r\n    <simple-notification\r\n            *ngFor=\"let a of notifications; let i = index\"\r\n            [item]=\"a\"\r\n            [timeOut]=\"timeOut\"\r\n            [clickToClose]=\"clickToClose\"\r\n            [clickIconToClose]=\"clickIconToClose\"\r\n            [maxLength]=\"maxLength\"\r\n            [showProgressBar]=\"showProgressBar\"\r\n            [pauseOnHover]=\"pauseOnHover\"\r\n            [theClass]=\"theClass\"\r\n            [rtl]=\"rtl\"\r\n            [animate]=\"animate\"\r\n            [position]=\"i\">\r\n    </simple-notification>\r\n</div>", styles: [".simple-notification-wrapper{position:fixed;width:300px;z-index:1000}.simple-notification-wrapper.left{left:20px}.simple-notification-wrapper.top{top:20px}.simple-notification-wrapper.right{right:20px}.simple-notification-wrapper.bottom{bottom:20px}.simple-notification-wrapper.center{left:50%;transform:translate(-50%)}.simple-notification-wrapper.middle{top:50%;transform:translateY(-50%)}.simple-notification-wrapper.middle.center{transform:translate(-50%,-50%)}@media (max-width: 340px){.simple-notification-wrapper{width:auto;left:20px;right:20px}}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: NotificationComponent, selector: "simple-notification", inputs: ["timeOut", "showProgressBar", "pauseOnHover", "clickToClose", "clickIconToClose", "maxLength", "theClass", "rtl", "animate", "position", "item"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: SimpleNotificationsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'simple-notifications', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"simple-notification-wrapper\" [ngClass]=\"position\">\r\n    <simple-notification\r\n            *ngFor=\"let a of notifications; let i = index\"\r\n            [item]=\"a\"\r\n            [timeOut]=\"timeOut\"\r\n            [clickToClose]=\"clickToClose\"\r\n            [clickIconToClose]=\"clickIconToClose\"\r\n            [maxLength]=\"maxLength\"\r\n            [showProgressBar]=\"showProgressBar\"\r\n            [pauseOnHover]=\"pauseOnHover\"\r\n            [theClass]=\"theClass\"\r\n            [rtl]=\"rtl\"\r\n            [animate]=\"animate\"\r\n            [position]=\"i\">\r\n    </simple-notification>\r\n</div>", styles: [".simple-notification-wrapper{position:fixed;width:300px;z-index:1000}.simple-notification-wrapper.left{left:20px}.simple-notification-wrapper.top{top:20px}.simple-notification-wrapper.right{right:20px}.simple-notification-wrapper.bottom{bottom:20px}.simple-notification-wrapper.center{left:50%;transform:translate(-50%)}.simple-notification-wrapper.middle{top:50%;transform:translateY(-50%)}.simple-notification-wrapper.middle.center{transform:translate(-50%,-50%)}@media (max-width: 340px){.simple-notification-wrapper{width:auto;left:20px;right:20px}}\n"] }]
        }], ctorParameters: function () { return [{ type: NotificationsService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
                type: Input
            }], create: [{
                type: Output
            }], destroy: [{
                type: Output
            }] } });

const DEFAULT_OPTIONS = {
    position: ['bottom', 'right'],
    timeOut: 0,
    showProgressBar: true,
    pauseOnHover: true,
    lastOnBottom: true,
    clickToClose: true,
    clickIconToClose: false,
    maxLength: 0,
    maxStack: 8,
    preventDuplicates: false,
    preventLastDuplicates: false,
    theClass: '',
    rtl: false,
    animate: NotificationAnimationType.FromRight,
    icons: DEFAULT_ICONS
};

const OPTIONS = new InjectionToken('options');
function optionsFactory(options) {
    return {
        ...DEFAULT_OPTIONS,
        ...options
    };
}
class SimpleNotificationsModule {
    static forRoot(options = {}) {
        return {
            ngModule: SimpleNotificationsModule,
            providers: [
                NotificationsService,
                {
                    provide: OPTIONS,
                    useValue: options
                },
                {
                    provide: 'options',
                    useFactory: optionsFactory,
                    deps: [OPTIONS]
                }
            ]
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: SimpleNotificationsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.11", ngImport: i0, type: SimpleNotificationsModule, declarations: [SimpleNotificationsComponent,
            NotificationComponent], imports: [CommonModule], exports: [SimpleNotificationsComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: SimpleNotificationsModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: SimpleNotificationsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [
                        SimpleNotificationsComponent,
                        NotificationComponent
                    ],
                    exports: [SimpleNotificationsComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NotificationAnimationType, NotificationComponent, NotificationType, NotificationsService, OPTIONS, SimpleNotificationsComponent, SimpleNotificationsModule, optionsFactory };
//# sourceMappingURL=angular2-notifications.mjs.map
