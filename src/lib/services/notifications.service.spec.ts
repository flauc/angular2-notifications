import { inject, TestBed } from '@angular/core/testing';
import { defaultIcons } from '../interfaces/icons';
import { NotificationEvent } from '../interfaces/notification-event.type';
import { Notification } from '../interfaces/notification.type';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            providers: [NotificationsService],
        });
    });

    const defaultNotification = {
        id: '0',
        title: 'Test title',
        type: 'success',
        icon: defaultIcons.success,
        content: 'Test Content',
        timeOut: 0,
        maxLength: 0,
        clickToClose: true,
        clickIconToClose: false,
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

            service.emitter.subscribe(item => notificationEvent = item);

            service.set(defaultNotification, true);

            expect(notificationEvent.command).toBe('set');
            expect(notificationEvent.notification.id !== '0').toBeTruthy();
        })
    );

    it('If override id is set its used',
        inject([NotificationsService], (service: NotificationsService) => {
            let notificationEvent: NotificationEvent = null;
            const override = {id: '1'};

            service.emitter.subscribe(item => notificationEvent = item);

            service.set(Object.assign(defaultNotification, {override}), true);

            expect(notificationEvent.notification.id).toBe('1');
        })
    );

    it('Success method',
        inject([NotificationsService], (service: NotificationsService) => {
            let notificationEvent: NotificationEvent = null;
            service.emitter.subscribe(item => notificationEvent = item);

            const notification: Notification = service.success('Title', 'Message');

            expect(notification.id !== undefined).toBeTruthy();
            expect(notification.type).toBe('success');
            expect(notification.icon).toBe(defaultIcons.success);

            expect(notification.title).toBe('Title');
            expect(notification.content).toBe('Message');
            expect(notification.override).toBeUndefined();
            expect(notification.html).toBeUndefined();
            expect(notification.state).toBeUndefined();
            expect(notification.createdOn).toBeUndefined();
            expect(notification.destroyedOn).toBeUndefined();
        })
    );

    it('Error method',
        inject([NotificationsService], (service: NotificationsService) => {
            let notificationEvent: NotificationEvent = null;
            service.emitter.subscribe(item => notificationEvent = item);

            const notification: Notification = service.error('Title', 'Message');

            expect(notification.id !== undefined).toBeTruthy();
            expect(notification.type).toBe('error');
            expect(notification.icon).toBe(defaultIcons.error);

            expect(notification.title).toBe('Title');
            expect(notification.content).toBe('Message');
            expect(notification.override).toBeUndefined();
            expect(notification.html).toBeUndefined();
            expect(notification.state).toBeUndefined();
            expect(notification.createdOn).toBeUndefined();
            expect(notification.destroyedOn).toBeUndefined();
        })
    );


    it('Alert method',
        inject([NotificationsService], (service: NotificationsService) => {
            let notificationEvent: NotificationEvent = null;
            service.emitter.subscribe(item => notificationEvent = item);

            const notification: Notification = service.alert('Title', 'Message');

            expect(notification.id !== undefined).toBeTruthy();
            expect(notification.type).toBe('alert');
            expect(notification.icon).toBe(defaultIcons.alert);

            expect(notification.title).toBe('Title');
            expect(notification.content).toBe('Message');
            expect(notification.override).toBeUndefined();
            expect(notification.html).toBeUndefined();
            expect(notification.state).toBeUndefined();
            expect(notification.createdOn).toBeUndefined();
            expect(notification.destroyedOn).toBeUndefined();
        })
    );


    it('Info method',
        inject([NotificationsService], (service: NotificationsService) => {
            let notificationEvent: NotificationEvent = null;
            service.emitter.subscribe(item => notificationEvent = item);

            const notification: Notification = service.info('Title', 'Message');

            expect(notification.id !== undefined).toBeTruthy();
            expect(notification.type).toBe('info');
            expect(notification.icon).toBe(defaultIcons.info);

            expect(notification.title).toBe('Title');
            expect(notification.content).toBe('Message');
            expect(notification.override).toBeUndefined();
            expect(notification.html).toBeUndefined();
            expect(notification.state).toBeUndefined();
            expect(notification.createdOn).toBeUndefined();
            expect(notification.destroyedOn).toBeUndefined();
        })
    );

    it('Warn method',
        inject([NotificationsService], (service: NotificationsService) => {
            let notificationEvent: NotificationEvent = null;
            service.emitter.subscribe(item => notificationEvent = item);

            const notification: Notification = service.warn('Title', 'Message');

            expect(notification.id !== undefined).toBeTruthy();
            expect(notification.type).toBe('warn');
            expect(notification.icon).toBe(defaultIcons.warn);

            expect(notification.title).toBe('Title');
            expect(notification.content).toBe('Message');
            expect(notification.override).toBeUndefined();
            expect(notification.html).toBeUndefined();
            expect(notification.state).toBeUndefined();
            expect(notification.createdOn).toBeUndefined();
            expect(notification.destroyedOn).toBeUndefined();
        })
    );

    it('Bare method',
        inject([NotificationsService], (service: NotificationsService) => {
            let notificationEvent: NotificationEvent = null;
            service.emitter.subscribe(item => notificationEvent = item);

            const notification: Notification = service.bare('Title', 'Message');

            expect(notification.id !== undefined).toBeTruthy();
            expect(notification.type).toBe('bare');
            expect(notification.icon).toBe('bare');

            expect(notification.title).toBe('Title');
            expect(notification.content).toBe('Message');
            expect(notification.override).toBeUndefined();
            expect(notification.html).toBeUndefined();
            expect(notification.state).toBeUndefined();
            expect(notification.createdOn).toBeUndefined();
            expect(notification.destroyedOn).toBeUndefined();
        })
    );


    it('Create method',
        inject([NotificationsService], (service: NotificationsService) => {
            let notificationEvent: NotificationEvent = null;
            service.emitter.subscribe(item => notificationEvent = item);

            const notification: Notification = service.create('Title', 'Message', 'create');

            expect(notification.id !== undefined).toBeTruthy();
            expect(notification.type).toBe('create');
            // expect(notification.icon).toBe('bare');

            expect(notification.title).toBe('Title');
            expect(notification.content).toBe('Message');
            expect(notification.override).toBeUndefined();
            expect(notification.html).toBeUndefined();
            expect(notification.state).toBeUndefined();
            expect(notification.createdOn).toBeUndefined();
            expect(notification.destroyedOn).toBeUndefined();
        })
    );


    it('Html method',
        inject([NotificationsService], (service: NotificationsService) => {
            let notificationEvent: NotificationEvent = null;
            service.emitter.subscribe(item => notificationEvent = item);

            const notification: Notification = service.html('<B>Title</B>', 'success');

            expect(notification.id !== undefined).toBeTruthy();
            expect(notification.type).toBe('success');
            expect(notification.icon).toBe('bare');

            expect(notification.title).toBeUndefined();
            expect(notification.content).toBeUndefined();
            expect(notification.override).toBeUndefined();
            expect(notification.html).toBe('<B>Title</B>');
            expect(notification.state).toBeUndefined();
            expect(notification.createdOn).toBeUndefined();
            expect(notification.destroyedOn).toBeUndefined();
        })
    );

    it('Empty remove emits cleanAll command',
        inject([NotificationsService], (service: NotificationsService) => {
            let notificationEvent: NotificationEvent = null;
            service.emitter.subscribe(item => notificationEvent = item);

            service.remove();

            expect(notificationEvent.command).toBe('cleanAll');
        })
    );

    it('Remove with id emits clean command',
        inject([NotificationsService], (service: NotificationsService) => {
            let notificationEvent: NotificationEvent = null;
            service.emitter.subscribe(item => notificationEvent = item);

            service.remove('1');

            expect(notificationEvent.command).toBe('clean');
            expect(notificationEvent.id).toBe('1');
        })
    );

});
