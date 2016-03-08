import {Component} from "angular2/core";
import {bootstrap}    from 'angular2/platform/browser'
import {NotificationsService} from "angular2-notifications/components";
import {SimpleNotificationsComponent} from "angular2-notifications/components";
@Component({
    selector: 'app',
    directives: [SimpleNotificationsComponent],
    providers: [NotificationsService],
    template: `
        <form (ngSubmit)="create()">
            <div>
                <label>Title</label>
                <p>The title of the notification.</p>
                <input type="text" [(ngModel)]="title">
            </div>
            <div>
                <label>Content</label>
                <p>The content of the notification.</p>
                <input type="text" [(ngModel)]="content">
            </div>
            <div>
                <label>Type</label>
                <p>The type of the notification.</p>
                <select [(ngModel)]="type">
                    <option value="success" selected>Success</option>
                    <option value="error">Error</option>
                    <option value="alert">Alert</option>
                    <option value="info">Info</option>
                </select>
            </div>
            <button type="submit">Create Notification</button>
        </form>
        <button (click)="removeAll()">Clean all notifications</button>
        <simple-notifications [options]="options" (onCreate)="onCreate($event)" (onDestroy)="onDestroy($event)"></simple-notifications>
        <button (click)="withOverride()">with override</button>
        <button (click)="withHtml()">with html</button>
    `
})

export class AppComponent {
    constructor(
        private _service: NotificationsService
    ) {}


    public title: string = 'just a title';
    public content: string = 'just content';
    public type: string = 'success';

    public temp: boolean[] = [true, false];

    public options = {
        timeOut: 5000,
        lastOnBottom: false,
        clickToClose: true,
        maxLength: 0,
        maxStack: 7,
        showProgressBar: true,
        pauseOnHover: true,
        preventDuplicates: true,
        preventLastDuplicates: false
    };

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

    withOverride() { this._service.create('pero', 'peric', 'success', {timeOut: 0, clickToClose:false, maxLength: 3, showProgressBar: true, theClass: 'overrideTest'}); }

    private html = `<p>Test</p><p>A nother test</p>`;
    withHtml() {this._service.html(this.html, 'success');}

    removeAll() { this._service.removeAll() }

    onCreate(event) {
        console.log(event);
    }

    onDestroy(event) {
        console.log(event);
    }
}

bootstrap(AppComponent);