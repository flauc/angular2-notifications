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
        <button (click)="removeAll()">Clean all notifications</button>
        <simple-notifications [options]="options"></simple-notifications>
        <button (click)="withOverride()">with override</button>
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
        timeOut: 6000,
        lastOnBottom: true,
        clickToClose: true,
        maxLength: 0,
        maxStack: 3,
        showProgressBar: true
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
        }
    }

    withOverride() {
        this._service.set({title: 'pero', content: 'peric', type: 'success', override: {timeOut: 300, clickToClose:false, maxLength: 3}}, true);
    }

    removeAll() { this._service.removeAll() }
}

bootstrap(AppComponent);