import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app';
import {SimpleNotificationsModule, PushNotificationsModule} from 'angular2-notifications';

@NgModule({
    imports: [BrowserModule, SimpleNotificationsModule, FormsModule, PushNotificationsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }