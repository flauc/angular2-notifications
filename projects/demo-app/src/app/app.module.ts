import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ExampleComponent } from './example.component';

import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [ 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [ AppComponent, ExampleComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
