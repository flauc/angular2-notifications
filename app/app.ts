import {Component, enableProdMode, OnInit, OnDestroy} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {NotificationsComponent} from "./src/notifications.component";
import {NotificationsService} from "./src/notifications.service";
enableProdMode();

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    directives: [NotificationsComponent],
    providers: [NotificationsService]
})

class AppComponent {
    public test: string = 'test';
}


bootstrap(AppComponent);