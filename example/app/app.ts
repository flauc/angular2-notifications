import 'rxjs/Rx';
import {Component, OnInit} from '@angular/core';
import {NotificationsService, SimpleNotificationsComponent, Options, PushNotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app',
    template: `
        <form>
            <div>
                <label>Title</label>
                <p>The title of the notification.</p>
                <input type="text" [(ngModel)]="title" name="title">
            </div>
            <div>
                <label>Content</label>
                <p>The content of the notification.</p>
                <input type="text" [(ngModel)]="content" name="content">
            </div>
            <div>
                <label>Type</label>
                <p>The type of the notification.</p>
                <select [(ngModel)]="type" name="type">
                    <option value="success" selected>Success</option>
                    <option value="error">Error</option>
                    <option value="alert">Alert</option>
                    <option value="info">Info</option>
                    <option value="bare">Bare</option>
                </select>
            </div>
            <button (click)="create()">Create Notification</button>
        </form>
        <button (click)="removeAll()">Clean all notifications</button>
        <simple-notifications [options]="options" (onCreate)="onCreate($event)" (onDestroy)="onDestroy($event)"></simple-notifications>
        <button (click)="withOverride()">with override</button>
        <button (click)="withHtml()">with html</button>
        
        <form (ngSubmit)="cleanSingle()">
            <input type="text" [(ngModel)]="deleteId" name="bla">
            <button type="submit">Delete</button>
        </form>
        
        <button (click)="getPermission()">Get push permission</button>
        <button (click)="createPush()">Create Push</button>
    `
})

export class AppComponent {
    constructor(
        private _service: NotificationsService,
        private _push: PushNotificationsService
    ) {}

    public title: string = 'just a title';
    public content: string = 'just content';
    public type: string = 'success';

    public deleteId: string;

    public temp: boolean[] = [true, false];

    public options = {
        timeOut: 5000,
        lastOnBottom: true,
        clickToClose: true,
        maxLength: 0,
        maxStack: 7,
        showProgressBar: true,
        pauseOnHover: true,
        preventDuplicates: false,
        preventLastDuplicates: 'visible',
        rtl: false,
        animate: 'scale',
        position: ['right', 'bottom']
    };

    private html = `<p>Test</p><p>A nother test</p>`;

    // createPush() {
    //     this._push.create({title: "test", body: "bla"})
    // }


    create() {
        switch (this.type) {
            case 'success':
                let a = this._service.success(this.title, this.content, {id: 123});
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
            case 'bare':
                this._service.bare(this.title, this.content);
                break;
        }
    }

    withOverride() { this._service.create('pero', 'peric', 'success', {timeOut: 0, clickToClose: false, maxLength: 3, showProgressBar: true, theClass: 'overrideTest'}) }

    withHtml() {this._service.html(this.html, 'success') }

    removeAll() { this._service.remove() }

    onCreate(event) {
        console.log(event);
    }

    onDestroy(event) {
        console.log(event);
    }

    getPermission() {
        this._push.getPermission();
    }

    createPush() {
        this._push.create('Test', {body: 'bla'}).subscribe(
            res => console.log(res),
            err => console.log(err),
            com => console.log('in complete: ', com)
        )
    }
    
    cleanSingle() {
        console.log(this.deleteId);
        this._service.remove(this.deleteId);
    }
}