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
        content: 'Test Content',
        timeOut: 0,
        maxLength: 0,
        clickToClose: true,
        showProgressBar: true,
        pauseOnHover: true,
        theClass: 'initial',
        rtl: false,
        animate: 'fromRight',
        icons: defaultIcons,
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

            let notificationEvent: NotificationEvent = null,
                notification: Notification = {
                    id: '0', type: '', icon: '', title: '',
                    content: '', override: null, html: 'any', state: '',
                    createdOn: new Date(), destroyedOn: new Date()
                };

            service.getChangeEmitter().subscribe(item => notificationEvent = item);

            service.set(notification, true);

            expect(notificationEvent.command).toBe('set');
            expect(notificationEvent.id !== '0').toBeTruthy();
        })
    );

    it('The following options can be overridden: id, animate, timeOut, pauseOnHover, clickToClose, maxLength, theClass, icons',
        inject([NotificationsService], (service: NotificationsService) => {
            let notificationEvent: NotificationEvent = null,
                notificationOverride: Notification = {
                    id: '2', type: '', icon: '', title: '',
                    content: '', override: null, html: 'any', state: '',
                    createdOn: new Date(), destroyedOn: null
                },
                notification: Notification = {
                    id: '0', type: '', icon: '', title: '',
                    content: '', override: notificationOverride, html: 'any', state: '',
                    createdOn: new Date(), destroyedOn: null
                };

            service.getChangeEmitter().subscribe(item => notificationEvent = item);

            service.set(notification, true);

            expect(notificationEvent.command).toBe('set');
            expect(notificationEvent.notification.id).toBe('2');
        })
    );

});