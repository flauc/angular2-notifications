import {Component, enableProdMode} from 'angular2/core';
import {NotificationsService, NotificationsComponent} from 'notifications'
import {bootstrap} from 'angular2/platform/browser';
enableProdMode();

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    directives: [NotificationsComponent],
    providers: [NotificationsService]
})

export class AppComponent {
    public test: string = 'test';
}

bootstrap(AppComponent);