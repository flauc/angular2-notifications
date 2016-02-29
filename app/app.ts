import {Component, OnInit, OnDestroy} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {NotificationsComponent} from "./src/notifications.component";
import {NotificationsService} from "./src/notifications.service";

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    directives: [NotificationsComponent],
    providers: [NotificationsService]
})

class AppComponent {
    constructor(
        private _service: NotificationsService
    ) {}
    public options = {
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

    public title: string = 'just a title';
    public content: string = 'just content';
    public type: string = 'success';

    create(){
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
        }
    }

    removeAll() { this._service.removeAll() }

    public over = {
        timeOut: 5000,
        clickToClose: true,
        maxLength: 100,
        showProgressBar: true,
        pauseOnHover: true
    };

    override() {
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
    }
}


bootstrap(AppComponent);