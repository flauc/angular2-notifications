import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app";
import {SimpleNotificationsModule} from "angular2-notifications";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [BrowserModule, SimpleNotificationsModule, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }