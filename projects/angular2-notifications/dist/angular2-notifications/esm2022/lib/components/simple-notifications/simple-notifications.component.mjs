import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NotificationAnimationType } from '../../enums/notification-animation-type.enum';
import * as i0 from "@angular/core";
import * as i1 from "../../services/notifications.service";
import * as i2 from "@angular/common";
import * as i3 from "../notification/notification.component";
export class SimpleNotificationsComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: SimpleNotificationsComponent, deps: [{ token: i1.NotificationsService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.11", type: SimpleNotificationsComponent, selector: "simple-notifications", inputs: { options: "options" }, outputs: { create: "create", destroy: "destroy" }, ngImport: i0, template: "<div class=\"simple-notification-wrapper\" [ngClass]=\"position\">\r\n    <simple-notification\r\n            *ngFor=\"let a of notifications; let i = index\"\r\n            [item]=\"a\"\r\n            [timeOut]=\"timeOut\"\r\n            [clickToClose]=\"clickToClose\"\r\n            [clickIconToClose]=\"clickIconToClose\"\r\n            [maxLength]=\"maxLength\"\r\n            [showProgressBar]=\"showProgressBar\"\r\n            [pauseOnHover]=\"pauseOnHover\"\r\n            [theClass]=\"theClass\"\r\n            [rtl]=\"rtl\"\r\n            [animate]=\"animate\"\r\n            [position]=\"i\">\r\n    </simple-notification>\r\n</div>", styles: [".simple-notification-wrapper{position:fixed;width:300px;z-index:1000}.simple-notification-wrapper.left{left:20px}.simple-notification-wrapper.top{top:20px}.simple-notification-wrapper.right{right:20px}.simple-notification-wrapper.bottom{bottom:20px}.simple-notification-wrapper.center{left:50%;transform:translate(-50%)}.simple-notification-wrapper.middle{top:50%;transform:translateY(-50%)}.simple-notification-wrapper.middle.center{transform:translate(-50%,-50%)}@media (max-width: 340px){.simple-notification-wrapper{width:auto;left:20px;right:20px}}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i3.NotificationComponent, selector: "simple-notification", inputs: ["timeOut", "showProgressBar", "pauseOnHover", "clickToClose", "clickIconToClose", "maxLength", "theClass", "rtl", "animate", "position", "item"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.11", ngImport: i0, type: SimpleNotificationsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'simple-notifications', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"simple-notification-wrapper\" [ngClass]=\"position\">\r\n    <simple-notification\r\n            *ngFor=\"let a of notifications; let i = index\"\r\n            [item]=\"a\"\r\n            [timeOut]=\"timeOut\"\r\n            [clickToClose]=\"clickToClose\"\r\n            [clickIconToClose]=\"clickIconToClose\"\r\n            [maxLength]=\"maxLength\"\r\n            [showProgressBar]=\"showProgressBar\"\r\n            [pauseOnHover]=\"pauseOnHover\"\r\n            [theClass]=\"theClass\"\r\n            [rtl]=\"rtl\"\r\n            [animate]=\"animate\"\r\n            [position]=\"i\">\r\n    </simple-notification>\r\n</div>", styles: [".simple-notification-wrapper{position:fixed;width:300px;z-index:1000}.simple-notification-wrapper.left{left:20px}.simple-notification-wrapper.top{top:20px}.simple-notification-wrapper.right{right:20px}.simple-notification-wrapper.bottom{bottom:20px}.simple-notification-wrapper.center{left:50%;transform:translate(-50%)}.simple-notification-wrapper.middle{top:50%;transform:translateY(-50%)}.simple-notification-wrapper.middle.center{transform:translate(-50%,-50%)}@media (max-width: 340px){.simple-notification-wrapper{width:auto;left:20px;right:20px}}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NotificationsService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
                type: Input
            }], create: [{
                type: Output
            }], destroy: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLW5vdGlmaWNhdGlvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnRzL3NpbXBsZS1ub3RpZmljYXRpb25zL3NpbXBsZS1ub3RpZmljYXRpb25zLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50cy9zaW1wbGUtbm90aWZpY2F0aW9ucy9zaW1wbGUtbm90aWZpY2F0aW9ucy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxpQkFBaUIsRUFBOEIsTUFBTSxlQUFlLENBQUM7QUFFbEssT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sOENBQThDLENBQUM7Ozs7O0FBWXpGLE1BQU0sT0FBTyw0QkFBNEI7SUFFN0I7SUFDQTtJQUZWLFlBQ1UsT0FBNkIsRUFDN0IsRUFBcUI7UUFEckIsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFDN0IsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7SUFDM0IsQ0FBQztJQUVMLElBQWEsT0FBTyxDQUFDLEdBQVk7UUFDL0IsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFUyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUM1QixPQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUV2QyxhQUFhLEdBQW1CLEVBQUUsQ0FBQztJQUNuQyxRQUFRLEdBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFakMsdUJBQXVCLENBQWU7SUFDdEMsUUFBUSxDQUFlO0lBRS9CLGtCQUFrQjtJQUNWLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDcEIsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNiLHFCQUFxQixHQUFRLEtBQUssQ0FBQztJQUNuQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFFbEMsY0FBYztJQUNkLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDWixTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsWUFBWSxHQUFHLElBQUksQ0FBQztJQUNwQixnQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFDekIsZUFBZSxHQUFHLElBQUksQ0FBQztJQUN2QixZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDZCxHQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ1osT0FBTyxHQUE4Qix5QkFBeUIsQ0FBQyxTQUFTLENBQUM7SUFFakUscUJBQXFCLEdBQUcsS0FBSyxDQUFDO0lBRXRDLFFBQVE7UUFFTjs7O1dBR0c7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQy9CLElBQUksQ0FBQyxhQUFhLENBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUMzQixDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTzthQUNqQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEIsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNwQixLQUFLLFVBQVU7b0JBQ2IsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7b0JBQ3hCLE1BQU07Z0JBRVIsS0FBSyxPQUFPO29CQUNWLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUcsQ0FBQyxDQUFDO29CQUMzQixNQUFNO2dCQUVSLEtBQUssS0FBSztvQkFDUixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBYSxDQUFDLENBQUM7cUJBQzlCO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzVCO29CQUNELE1BQU07Z0JBRVI7b0JBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDM0IsTUFBTTthQUNUO1lBQ0QsSUFBSSxDQUFFLElBQUksQ0FBQyxFQUFjLENBQUMsU0FBUyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsNEJBQTRCO0lBQzVCLGVBQWUsQ0FBQyxLQUFVO1FBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBR0QscURBQXFEO0lBQ3JELEdBQUcsQ0FBQyxJQUFrQjtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFFNUIsTUFBTSxPQUFPLEdBQVksSUFBSSxDQUFDLHFCQUFxQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBRXpHLDZDQUE2QztRQUM3QyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLHVCQUF1QjtRQUN2QixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVDO1FBRUQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLGlGQUFpRjtZQUNqRixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNqQztnQkFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMvQjtpQkFBTTtnQkFDTCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDN0Q7Z0JBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2QztZQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDO0lBRUQsNkNBQTZDO0lBQzdDLEtBQUssQ0FBQyxJQUFrQjtRQUV0QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBRWhFLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzRCxLQUFLLE1BQU0sWUFBWSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQzdDLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDL0IsT0FBTyxJQUFJLENBQUM7aUJBQ2I7YUFDRjtTQUNGO1FBRUQsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFFOUIsSUFBSSxJQUFrQixDQUFDO1lBRXZCLElBQUksSUFBSSxDQUFDLHFCQUFxQixLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzdFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDckIsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQzFEO3FCQUFNO29CQUNMLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM5QjthQUNGO2lCQUFNLElBQUksSUFBSSxDQUFDLHFCQUFxQixLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7Z0JBQy9FLElBQUksR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUM7YUFDckM7aUJBQU07Z0JBQ0wsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1QjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFxQixFQUFFLElBQWtCO1FBQ3JELE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEcsQ0FBQztJQUVELFNBQVMsQ0FBQyxPQUFxQixFQUFFLElBQWtCO1FBQ2pELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlILEtBQUssQ0FBQztJQUNWLENBQUM7SUFFRCx3REFBd0Q7SUFDeEQsYUFBYSxDQUFDLE9BQVk7UUFDeEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixJQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25DO2lCQUFNLElBQUksR0FBRyxLQUFLLE9BQU8sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25DO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsU0FBUyxDQUFDLFlBQTBCLEVBQUUsRUFBVztRQUMvQyxNQUFNLE1BQU0sR0FBaUI7WUFDM0IsU0FBUyxFQUFFLFlBQVksQ0FBQyxTQUFTO1lBQ2pDLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSTtZQUN2QixJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUk7WUFDdkIsRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFO1NBQ3BCLENBQUM7UUFFRixJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUU7WUFDckIsTUFBTSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1NBQ2pDO2FBQU07WUFDTCxNQUFNLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDbEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDO1NBQ3ZDO1FBRUQsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNQLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUNqQztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxXQUFXLENBQUMsRUFBVTtRQUNwQixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDO1FBRVQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDMUIsYUFBYSxHQUFHLEdBQUcsQ0FBQztnQkFDcEIsSUFBSSxHQUFHLFlBQVksQ0FBQztnQkFDcEIsUUFBUSxHQUFHLElBQUksQ0FBQzthQUNqQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7d0dBN05VLDRCQUE0Qjs0RkFBNUIsNEJBQTRCLCtJQ2R6Qyxzb0JBZU07OzRGRERPLDRCQUE0QjtrQkFQeEMsU0FBUzsrQkFDRSxzQkFBc0IsaUJBQ2pCLGlCQUFpQixDQUFDLElBQUksbUJBR3BCLHVCQUF1QixDQUFDLE1BQU07MklBUWxDLE9BQU87c0JBQW5CLEtBQUs7Z0JBS0ksTUFBTTtzQkFBZixNQUFNO2dCQUNHLE9BQU87c0JBQWhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbkFuaW1hdGlvblR5cGUgfSBmcm9tICcuLi8uLi9lbnVtcy9ub3RpZmljYXRpb24tYW5pbWF0aW9uLXR5cGUuZW51bSc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbm90aWZpY2F0aW9uLnR5cGUnO1xyXG5pbXBvcnQgeyBPcHRpb25zLCBQb3NpdGlvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvb3B0aW9ucy50eXBlJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3RpZmljYXRpb25zLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzaW1wbGUtbm90aWZpY2F0aW9ucycsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2ltcGxlLW5vdGlmaWNhdGlvbnMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NpbXBsZS1ub3RpZmljYXRpb25zLmNvbXBvbmVudC5jc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2ltcGxlTm90aWZpY2F0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc2VydmljZTogTm90aWZpY2F0aW9uc1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkgeyB9XHJcblxyXG4gIEBJbnB1dCgpIHNldCBvcHRpb25zKG9wdDogT3B0aW9ucykge1xyXG4gICAgdGhpcy51c2luZ0NvbXBvbmVudE9wdGlvbnMgPSB0cnVlO1xyXG4gICAgdGhpcy5hdHRhY2hDaGFuZ2VzKG9wdCk7XHJcbiAgfVxyXG5cclxuICBAT3V0cHV0KCkgY3JlYXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkZXN0cm95ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25bXSA9IFtdO1xyXG4gIHBvc2l0aW9uOiBQb3NpdGlvbiA9IFsnYm90dG9tJywgJ3JpZ2h0J107XHJcblxyXG4gIHByaXZhdGUgbGFzdE5vdGlmaWNhdGlvbkNyZWF0ZWQ6IE5vdGlmaWNhdGlvbjtcclxuICBwcml2YXRlIGxpc3RlbmVyOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8vIFJlY2VpdmVkIHZhbHVlc1xyXG4gIHByaXZhdGUgbGFzdE9uQm90dG9tID0gdHJ1ZTtcclxuICBwcml2YXRlIG1heFN0YWNrID0gODtcclxuICBwcml2YXRlIHByZXZlbnRMYXN0RHVwbGljYXRlczogYW55ID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBwcmV2ZW50RHVwbGljYXRlcyA9IGZhbHNlO1xyXG5cclxuICAvLyBTZW50IHZhbHVlc1xyXG4gIHRpbWVPdXQgPSAwO1xyXG4gIG1heExlbmd0aCA9IDA7XHJcbiAgY2xpY2tUb0Nsb3NlID0gdHJ1ZTtcclxuICBjbGlja0ljb25Ub0Nsb3NlID0gZmFsc2U7XHJcbiAgc2hvd1Byb2dyZXNzQmFyID0gdHJ1ZTtcclxuICBwYXVzZU9uSG92ZXIgPSB0cnVlO1xyXG4gIHRoZUNsYXNzID0gJyc7XHJcbiAgcnRsID0gZmFsc2U7XHJcbiAgYW5pbWF0ZTogTm90aWZpY2F0aW9uQW5pbWF0aW9uVHlwZSA9IE5vdGlmaWNhdGlvbkFuaW1hdGlvblR5cGUuRnJvbVJpZ2h0O1xyXG5cclxuICBwcml2YXRlIHVzaW5nQ29tcG9uZW50T3B0aW9ucyA9IGZhbHNlO1xyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ubHkgYXR0YWNoIGdsb2JhbCBvcHRpb25zIGlmIGNvbmZpZ1xyXG4gICAgICogb3B0aW9ucyB3ZXJlIG5ldmVyIHNlbnQgdGhyb3VnaCBpbnB1dFxyXG4gICAgICovXHJcbiAgICBpZiAoIXRoaXMudXNpbmdDb21wb25lbnRPcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuYXR0YWNoQ2hhbmdlcyhcclxuICAgICAgICB0aGlzLnNlcnZpY2UuZ2xvYmFsT3B0aW9uc1xyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGlzdGVuZXIgPSB0aGlzLnNlcnZpY2UuZW1pdHRlclxyXG4gICAgICAuc3Vic2NyaWJlKGl0ZW0gPT4ge1xyXG4gICAgICAgIHN3aXRjaCAoaXRlbS5jb21tYW5kKSB7XHJcbiAgICAgICAgICBjYXNlICdjbGVhbkFsbCc6XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICBjYXNlICdjbGVhbic6XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYW5TaW5nbGUoaXRlbS5pZCEpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICBjYXNlICdzZXQnOlxyXG4gICAgICAgICAgICBpZiAoaXRlbS5hZGQpIHtcclxuICAgICAgICAgICAgICB0aGlzLmFkZChpdGVtLm5vdGlmaWNhdGlvbiEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEJlaGF2aW9yKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEJlaGF2aW9yKGl0ZW0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEodGhpcy5jZCBhcyBWaWV3UmVmKS5kZXN0cm95ZWQpIHtcclxuICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLmxpc3RlbmVyKSB7XHJcbiAgICAgIHRoaXMubGlzdGVuZXIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2QuZGV0YWNoKCk7XHJcbiAgfVxyXG5cclxuICAvLyBEZWZhdWx0IGJlaGF2aW9yIG9uIGV2ZW50XHJcbiAgZGVmYXVsdEJlaGF2aW9yKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMubm90aWZpY2F0aW9ucy5zcGxpY2UodGhpcy5ub3RpZmljYXRpb25zLmluZGV4T2YodmFsdWUubm90aWZpY2F0aW9uKSwgMSk7XHJcbiAgICB0aGlzLmRlc3Ryb3kuZW1pdCh0aGlzLmJ1aWxkRW1pdCh2YWx1ZS5ub3RpZmljYXRpb24sIGZhbHNlKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gQWRkIHRoZSBuZXcgbm90aWZpY2F0aW9uIHRvIHRoZSBub3RpZmljYXRpb24gYXJyYXlcclxuICBhZGQoaXRlbTogTm90aWZpY2F0aW9uKTogdm9pZCB7XHJcbiAgICBpdGVtLmNyZWF0ZWRPbiA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgY29uc3QgdG9CbG9jazogYm9vbGVhbiA9IHRoaXMucHJldmVudExhc3REdXBsaWNhdGVzIHx8IHRoaXMucHJldmVudER1cGxpY2F0ZXMgPyB0aGlzLmJsb2NrKGl0ZW0pIDogZmFsc2U7XHJcblxyXG4gICAgLy8gU2F2ZSB0aGlzIGFzIHRoZSBsYXN0IGNyZWF0ZWQgbm90aWZpY2F0aW9uXHJcbiAgICB0aGlzLmxhc3ROb3RpZmljYXRpb25DcmVhdGVkID0gaXRlbTtcclxuICAgIC8vIE92ZXJyaWRlIGljb24gaWYgc2V0XHJcbiAgICBpZiAoaXRlbS5vdmVycmlkZSAmJiBpdGVtLm92ZXJyaWRlLmljb25zICYmIGl0ZW0ub3ZlcnJpZGUuaWNvbnNbaXRlbS50eXBlXSkge1xyXG4gICAgICBpdGVtLmljb24gPSBpdGVtLm92ZXJyaWRlLmljb25zW2l0ZW0udHlwZV07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0b0Jsb2NrKSB7XHJcbiAgICAgIC8vIENoZWNrIGlmIHRoZSBub3RpZmljYXRpb24gc2hvdWxkIGJlIGFkZGVkIGF0IHRoZSBzdGFydCBvciB0aGUgZW5kIG9mIHRoZSBhcnJheVxyXG4gICAgICBpZiAodGhpcy5sYXN0T25Cb3R0b20pIHtcclxuICAgICAgICBpZiAodGhpcy5ub3RpZmljYXRpb25zLmxlbmd0aCA+PSB0aGlzLm1heFN0YWNrKSB7XHJcbiAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLnB1c2goaXRlbSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm90aWZpY2F0aW9ucy5sZW5ndGggPj0gdGhpcy5tYXhTdGFjaykge1xyXG4gICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zLnNwbGljZSh0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoIC0gMSwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbnMuc3BsaWNlKDAsIDAsIGl0ZW0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmNyZWF0ZS5lbWl0KHRoaXMuYnVpbGRFbWl0KGl0ZW0sIHRydWUpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIENoZWNrIGlmIG5vdGlmaWNhdGlvbnMgc2hvdWxkIGJlIHByZXZlbnRlZFxyXG4gIGJsb2NrKGl0ZW06IE5vdGlmaWNhdGlvbik6IGJvb2xlYW4ge1xyXG5cclxuICAgIGNvbnN0IHRvQ2hlY2sgPSBpdGVtLmh0bWwgPyB0aGlzLmNoZWNrSHRtbCA6IHRoaXMuY2hlY2tTdGFuZGFyZDtcclxuXHJcbiAgICBpZiAodGhpcy5wcmV2ZW50RHVwbGljYXRlcyAmJiB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBmb3IgKGNvbnN0IG5vdGlmaWNhdGlvbiBvZiB0aGlzLm5vdGlmaWNhdGlvbnMpIHtcclxuICAgICAgICBpZiAodG9DaGVjayhub3RpZmljYXRpb24sIGl0ZW0pKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wcmV2ZW50TGFzdER1cGxpY2F0ZXMpIHtcclxuXHJcbiAgICAgIGxldCBjb21wOiBOb3RpZmljYXRpb247XHJcblxyXG4gICAgICBpZiAodGhpcy5wcmV2ZW50TGFzdER1cGxpY2F0ZXMgPT09ICd2aXNpYmxlJyAmJiB0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGlmICh0aGlzLmxhc3RPbkJvdHRvbSkge1xyXG4gICAgICAgICAgY29tcCA9IHRoaXMubm90aWZpY2F0aW9uc1t0aGlzLm5vdGlmaWNhdGlvbnMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbXAgPSB0aGlzLm5vdGlmaWNhdGlvbnNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJldmVudExhc3REdXBsaWNhdGVzID09PSAnYWxsJyAmJiB0aGlzLmxhc3ROb3RpZmljYXRpb25DcmVhdGVkKSB7XHJcbiAgICAgICAgY29tcCA9IHRoaXMubGFzdE5vdGlmaWNhdGlvbkNyZWF0ZWQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0b0NoZWNrKGNvbXAsIGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNoZWNrU3RhbmRhcmQoY2hlY2tlcjogTm90aWZpY2F0aW9uLCBpdGVtOiBOb3RpZmljYXRpb24pOiBib29sZWFuIHtcclxuICAgIHJldHVybiBjaGVja2VyLnR5cGUgPT09IGl0ZW0udHlwZSAmJiBjaGVja2VyLnRpdGxlID09PSBpdGVtLnRpdGxlICYmIGNoZWNrZXIuY29udGVudCA9PT0gaXRlbS5jb250ZW50O1xyXG4gIH1cclxuXHJcbiAgY2hlY2tIdG1sKGNoZWNrZXI6IE5vdGlmaWNhdGlvbiwgaXRlbTogTm90aWZpY2F0aW9uKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gY2hlY2tlci5odG1sID9cclxuICAgICAgY2hlY2tlci50eXBlID09PSBpdGVtLnR5cGUgJiYgY2hlY2tlci50aXRsZSA9PT0gaXRlbS50aXRsZSAmJiBjaGVja2VyLmNvbnRlbnQgPT09IGl0ZW0uY29udGVudCAmJiBjaGVja2VyLmh0bWwgPT09IGl0ZW0uaHRtbCA6XHJcbiAgICAgIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLy8gQXR0YWNoIGFsbCB0aGUgY2hhbmdlcyByZWNlaXZlZCBpbiB0aGUgb3B0aW9ucyBvYmplY3RcclxuICBhdHRhY2hDaGFuZ2VzKG9wdGlvbnM6IGFueSkge1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9ucykge1xyXG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgKHRoaXMgYXMgYW55KVtrZXldID0gb3B0aW9uc1trZXldO1xyXG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2ljb25zJykge1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5pY29ucyA9IG9wdGlvbnNba2V5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYnVpbGRFbWl0KG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uLCB0bzogYm9vbGVhbikge1xyXG4gICAgY29uc3QgdG9FbWl0OiBOb3RpZmljYXRpb24gPSB7XHJcbiAgICAgIGNyZWF0ZWRPbjogbm90aWZpY2F0aW9uLmNyZWF0ZWRPbixcclxuICAgICAgdHlwZTogbm90aWZpY2F0aW9uLnR5cGUsXHJcbiAgICAgIGljb246IG5vdGlmaWNhdGlvbi5pY29uLFxyXG4gICAgICBpZDogbm90aWZpY2F0aW9uLmlkXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChub3RpZmljYXRpb24uaHRtbCkge1xyXG4gICAgICB0b0VtaXQuaHRtbCA9IG5vdGlmaWNhdGlvbi5odG1sO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9FbWl0LnRpdGxlID0gbm90aWZpY2F0aW9uLnRpdGxlO1xyXG4gICAgICB0b0VtaXQuY29udGVudCA9IG5vdGlmaWNhdGlvbi5jb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdG8pIHtcclxuICAgICAgdG9FbWl0LmRlc3Ryb3llZE9uID0gbmV3IERhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdG9FbWl0O1xyXG4gIH1cclxuXHJcbiAgY2xlYW5TaW5nbGUoaWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgbGV0IGluZGV4T2ZEZWxldGUgPSAwO1xyXG4gICAgbGV0IGRvRGVsZXRlID0gZmFsc2U7XHJcbiAgICBsZXQgbm90aTtcclxuXHJcbiAgICB0aGlzLm5vdGlmaWNhdGlvbnMuZm9yRWFjaCgobm90aWZpY2F0aW9uLCBpZHgpID0+IHtcclxuICAgICAgaWYgKG5vdGlmaWNhdGlvbi5pZCA9PT0gaWQpIHtcclxuICAgICAgICBpbmRleE9mRGVsZXRlID0gaWR4O1xyXG4gICAgICAgIG5vdGkgPSBub3RpZmljYXRpb247XHJcbiAgICAgICAgZG9EZWxldGUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZG9EZWxldGUpIHtcclxuICAgICAgdGhpcy5ub3RpZmljYXRpb25zLnNwbGljZShpbmRleE9mRGVsZXRlLCAxKTtcclxuICAgICAgdGhpcy5kZXN0cm95LmVtaXQodGhpcy5idWlsZEVtaXQobm90aSwgZmFsc2UpKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cInNpbXBsZS1ub3RpZmljYXRpb24td3JhcHBlclwiIFtuZ0NsYXNzXT1cInBvc2l0aW9uXCI+XHJcbiAgICA8c2ltcGxlLW5vdGlmaWNhdGlvblxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgYSBvZiBub3RpZmljYXRpb25zOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgICAgICAgW2l0ZW1dPVwiYVwiXHJcbiAgICAgICAgICAgIFt0aW1lT3V0XT1cInRpbWVPdXRcIlxyXG4gICAgICAgICAgICBbY2xpY2tUb0Nsb3NlXT1cImNsaWNrVG9DbG9zZVwiXHJcbiAgICAgICAgICAgIFtjbGlja0ljb25Ub0Nsb3NlXT1cImNsaWNrSWNvblRvQ2xvc2VcIlxyXG4gICAgICAgICAgICBbbWF4TGVuZ3RoXT1cIm1heExlbmd0aFwiXHJcbiAgICAgICAgICAgIFtzaG93UHJvZ3Jlc3NCYXJdPVwic2hvd1Byb2dyZXNzQmFyXCJcclxuICAgICAgICAgICAgW3BhdXNlT25Ib3Zlcl09XCJwYXVzZU9uSG92ZXJcIlxyXG4gICAgICAgICAgICBbdGhlQ2xhc3NdPVwidGhlQ2xhc3NcIlxyXG4gICAgICAgICAgICBbcnRsXT1cInJ0bFwiXHJcbiAgICAgICAgICAgIFthbmltYXRlXT1cImFuaW1hdGVcIlxyXG4gICAgICAgICAgICBbcG9zaXRpb25dPVwiaVwiPlxyXG4gICAgPC9zaW1wbGUtbm90aWZpY2F0aW9uPlxyXG48L2Rpdj4iXX0=