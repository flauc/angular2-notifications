import {Component} from "angular2/core";
import {bootstrap}    from 'angular2/platform/browser'
import {NotificationsComponent} from "angular2-notifications/components";
import {NotificationsService} from "angular2-notifications/components";
@Component({
    selector: 'app',
    directives: [NotificationsComponent],
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
                </select>
            </div>
            <button type="submit">Create Notification</button>
        </form>
        <div>
            <div>
                <label>Time Out</label>
                <p>Set the amount of time before a notification disappears. If set to 0 then there is no time out.</p>
                <input type="number" [(ngModel)]="options.timeOut">
            </div>
            <div>
                <label>Last on bottom</label>
                <p>Should the last notification created apper on the top or bottom of the list.</p>
                <select [(ngModel)]="options.lastOnBottom">
                    <option *ngFor="#a of temp" value="{{a}}">{{a}}</option>
                </select>
            </div>
            <div>
                <label>Click to close</label>
                <p>Should notifications close when clicked</p>
                <select [(ngModel)]="options.clickToClose">
                    <option *ngFor="#a of temp" value="{{a}}">{{a}}</option>
                </select>
            </div>
        </div>
        <button (click)="removeAll()">Clean all notifications</button>
        <simple-notifications [options]="options"></simple-notifications>
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
        timeOut: 0,
        lastOnBottom: true,
        clickToClose: true
    };



    create(){
        console.log(this.options);
        console.log(this.title, this.content, this.type);
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
        }
    }

    removeAll() { this._service.removeAll() }
}

bootstrap(AppComponent);