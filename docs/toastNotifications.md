# Toast Notifications Documentation
Toast notifications are regular on-page notifications. 

## Setup

Add the SimpleNotificationsComponent in to the component where you want to use the notifications.
```js
...
directives: [SimpleNotificationsComponent],
template: '<simple-notifications [options]="options"></simple-notifications>'
...
```

The onCreate and onDestroy Event Emitters emit the notification that was created or destroyed you can utilise this functionality like this:
```js
<simple-notifications [options]="options" (onCreate)="created($event)" (onDestroy)="destroyed($event)"></simple-notifications>
```

You will also need to use the NotificationsService in your component to create or remove the notifications.
```js
...
providers: [NotificationsService]
...
constructor( private _service: NotificationsService ) {}
...
```

## Creating Notifications

This are the currently available access methods:

* The access methods return the constructed notification along with the created id.

| Method | Description
---| --- 
`success(title: string, content: string, override?: any)` | Creates a success notification with the provided title and content.
`error(title: string, content: string, override?: any)`  | Creates an error notification with the provided title and content.
`alert(title: string, content: string, override?: any)` | Creates an alert notification with the provided title and content.
`info(title: string, content: string, override?: any)` | Creates an info notification with the provided title and content.
`bare(title: string, content: string, override?: any)` | Creates a bare notification with the provided title and content. This notification type is best used when adding custom html.
`create(title: string, content: string, type: string, override?: any)` | Use this method to create any notification type ['success', 'error', 'alert', 'info', 'bare'].
`html(html: any, type: string, override?: any` | Use this method to create a notification with custom html.
`remove(id?: string)` | Removes the notification that has the provided id or removes all currently open notifications if no id was provided.

## Options
This are the current options that can be pass to the component:

Option | Type | Default | Description | 
------------ | ------------- | ------------- | -------------
__timeOut__ | int | 0 | Determine how long a notification should wait before closing. If set to 0 a notification won't close it self.
__showProgressBar__ | boolean | true | Determine if a progress bar should be shown or not.
__pauseOnHover__ | boolean | true | Determines if the timeOut should be paused when the notification is hovered.
__lastOnBottom__ | boolean | true | Determines if new notifications should appear at the bottom or top of the list.
__clickToClose__ | boolean | true | Determines if notifications should close on click.
__maxLength__ | int | 0 | Set the maximum allowed length of the content string. If set to 0 or not defined there is no maximum length.
__maxStacks__ | int | 8 | Set the maximum number of notifications that can be on the screen at once.
__preventDuplicates__ | boolean | false | If true prevents duplicates of open notifications.
__preventLastDuplicates__ | boolean or string | false | If set to "all" prevents duplicates of the latest notification shown ( even if it isn't on screen any more ). If set to "visible" only prevents duplicates of the last created notification if the notification is currently visible.
__theClass__ | string | null | A class that should be attached to the notification. (It doesn't exactly get attached to the selector but to the first div of the template.)
__rtl__ | boolean | false | Adds the class `.rtl-mode` to the notification aligning the icon to the left and adding `direction: rtl`
__animate__ | boolean | true | Determines if the notifications should have entering and leaving animations.

Here is an example of passing the options to the component. You only pass the options you want changed. 
Options passed to the component are global. They apply to all of the notifications the get created. 

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

If you want a specific notification to have different options you can override them when calling any of the access methods by passing them to the override object.
The following options can be overridden:
* id
* animate
* timeOut
* showProgressBar
* pauseOnHover
* clickToClose 
* maxLength
* theClass

Here is an example of overriding global options:
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
)
```

## Planed Features
* CSS Themes
* Animation
* Custom types