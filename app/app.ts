import {Component} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser'

@Component({
    selector: 'app',
    templateUrl: 'app/app.html'
})

export class AppComponent {
    public test: string = 'test';
}

bootstrap(AppComponent);