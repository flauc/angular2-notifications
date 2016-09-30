import {PushNotificationsModule, SimpleNotificationsModule} from 'angular2-notifications';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [BrowserModule, CommonModule, SimpleNotificationsModule, FormsModule, PushNotificationsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }