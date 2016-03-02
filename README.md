# Angular2-Notifications
A light and easy to use notifications library for Angular 2. 

## Example
Take a look at the live demo here: [Live Demo](http://flauc.github.io/angular2-notifications)
You can also clone this repository and check out the example folder.

## Setup
Download the library with npm
```
npm install --save angular2-notifications
```

Map the library in your System.config if you're using SystemJs.
```js
System.config({
    map: {
        'notifications': 'node_modules/angular2-notifications'
    }
});
```

Add the NotificationComponent in to the component where you want to use the notifications.
```js
...
directives: [NotificationComponent],
template: '<simple-notifications [options]="options"></simple-notifications>'
...
```

You will also need to use the NotificationsService in your component to create or remove the notifications.
```js
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
* `info(title: string, content: string, override?: any)` - Creates an info notification with the provided title and content.
* `create(title: string, content: string, type: string, override?: any)` - Use this method to create any notification type ['success', 'error', 'alert', 'info'].
* `html(html: any, type: string, override?: any` - Use this method to create a notification with custom html.
* `removeAll()` - Closes all currently open notifications.

## Options
This are the current options that can be pass to the component:
* __timeOut__ *[int] [Default: 0]* - Determine how long a notification should wait before closing. If set to 0 a notification won't close it self.
* __showProgressBar__ *[boolean] [Default: true]* - Determine if a progress bar should be shown or not.
* __pauseOnHover__ *[boolean] [Default: true]* - Determines if the timeOut should be paused when the notification is hovered.
* __lastOnBottom__ *[boolean] [Default: true]* - Determines if new notifications should appear at the bottom or top of the list.
* __clickToClose__ *[boolean] [Default: true]* - Determines if notifications should close on click.
* __maxLength__ *[int] [Default: 0]* - Set the maximum allowed length of the content string. If set to 0 or not defined there is no maximum length.
* __maxStacks__ *[int] [Default: 8]* - Set the maximum number of notifications that can be on the screen at once.
* __preventDuplicates__ *[boolean] [Default: false]* - If true prevents duplicates of open notifications.
* __preventLastDuplicates__ *[boolean] [Default: false]* - If true prevents duplicates of the latest notification shown.
* __theClass__ *[string] [Default: null]* - A class that should be attached to the notification. (It doesn't exactly get attached to the selector but to the first div of the template.)
```js
...
template: '<simple-notifications [options]="options"></simple-notifications>'
...
public options = {
    timeOut: 5000,
    lastOnBottom: true
    ...
}
```

The following options can be overridden by passing them to the override object:
* timeOut
* showProgressBar
* pauseOnHover
* clickToClose 
* maxLength
* theClass
```js
this._notificationsService.success(
    title: 'example', 
    content:'example', 
    override: {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    }
```

## Planed Features
* CSS Themes
* Animation
* Custom types
* HTML insert

