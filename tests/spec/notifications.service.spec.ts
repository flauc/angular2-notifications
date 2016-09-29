import {inject, TestBed} from '@angular/core/testing';
import {NotificationsService} from '../../src/notifications.service';
import {defaultIcons, Icons} from '../../src/icons';
import {NotificationEvent} from '../../src/notification-event.type';
import {Notification} from '../../src/notification.type';

describe('NotificationsService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [NotificationsService],
        });
    });

    let defaultNotification = {
        id: '0',
        title: 'Test title',
        type: 'success',
        icon: defaultIcons.success,
        content: 'Test Content',
        timeOut: 0,
        maxLength: 0,
        clickToClose: true,
        showProgressBar: true,
        pauseOnHover: true,
        theClass: 'initial',
        rtl: false,
        animate: 'fromRight',
        createdOn: new Date(),
        destroyedOn: new Date()
    };

    it('Service instantiates',
        inject([NotificationsService], (service: NotificationsService) => {
            expect(service instanceof NotificationsService).toBeTruthy();
        })
    );

    it('If override is not set, id is randomly generated',
        inject([NotificationsService], (service: NotificationsService) => {

            let notificationEvent: NotificationEvent = null;

            service.getChangeEmitter().subscribe(item => notificationEvent = item);

            service.set(defaultNotification, true);

            console.log(notificationEvent);

            expect(notificationEvent.command).toBe('set');
            expect(notificationEvent.notification.id !== '0').toBeTruthy();
        })
    );

    it('The following options can be overridden: id, animate, timeOut, pauseOnHover, clickToClose, maxLength, theClass, icon',
        inject([NotificationsService], (service: NotificationsService) => {
            let notificationEvent: NotificationEvent = null,
                notificationOverride: Notification = {
                    id: '1',
                    animate: 'fromLeft',
                    timeOut: 500,
                    pauseOnHover: false,
                    clickToClose: false,
                    maxLength: 4,
                    theClass: 'test',
                    icon: defaultIcons.alert

                };

            service.getChangeEmitter().subscribe(item => notificationEvent = item);

            service.set(notification, true);

            expect(notificationEvent.command).toBe('set');
            expect(notificationEvent.notification.id).toBe('2');
        })
    );

});