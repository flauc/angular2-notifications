# Angular2-Notifications
An easy to use notifications library for Angular 2
## Setup
Download the library with npm
```
npm install --save angular2-notifications
```

Map the library in your System.config if you're using SystemJs.
```
System.config({
    map: {
        'notifications': 'node_modules/angular2-notifications'
    }
});
```

Add the NotificationComponent in to the component where you want to use the notifications.
```
...
directives: [NotificationComponent],
template: '<simple-notifications [options]="options"></simple-notifications>'
...
```

You will also need to use the NotificationsService in your component to create or remove the notifications.
```
...
providers: [NotificationsService]
...
constructor( private _service: NotificationsService ) {}
...
```
This are the currently available access methods:
* `success(title: string, content: string, override?: any)` - Creates a success notification with the provided title and content.
* `error(title: string, content: string, override?: any)` - Creates an error notification with the provided title and content.
* `alert(title: string, content: string, override?: any)` - Creates an alert notification with the provided title and content.
* `removeAll()` - Closes all currently open notifications.

## Options

This are the current options that can be pass to the component:
* __timeOut__ -\[int] Determine how long a notification should wait before closing. If set to 0 a notification won't close it self. Default 0.
* __lastOnBottom__ - \[boolean] Determines if new notifications should appear at the bottom or top of the list. Default true;
* __clickToClose__ - \[boolean] Determines if notifications should close on click. Default true;
* __maxLength__ - \[int] Set the maximum allowed length of the content string. If set to 0 or not defined there is no maximum length. Default 0.
* __maxStacks__ - \[int] Set the maximum number of notifications that can be on the screen at once. Default 8.
```
...
template: '<simple-notifications [options]="options"></simple-notifications>'
...
public options = {
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 20,
    maxStack: 5
}
```

The timeOut, clickToClose and maxLength options get passed on to the single notification. This options can be overridden by passing them in the override object.
```
this._notificationsService.success(
    title: 'example', 
    content:'example', 
    override: {
        timeOut: 5000,
        clickToClose: false,
        maxLength: 10
    }
```

## Example

For a working example you can clone this repository and check out the example folder.
I will create a live link soon.

## Planed Features

* CSS Themes
* Animation
* Custom types
* HTML insert

