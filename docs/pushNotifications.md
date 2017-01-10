# Push Notifications 

If you arn't familiar with push notifications you can read more about them on the [Mozilla developer network](https://developer.mozilla.org/en-US/docs/Web/API/Notification).

## Setup

Import the `PushNotificationsModule` in to your `AppModule`
```ts
@NgModule({
    imports: [PushNotificationsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

Now import the `PushNotificationsService` where you want to use it: 

```ts
constructor( private _pushNotifications: PushNotificationsService ) {}
```

## Requesting Permission

To request permission from the user to display push notifications call the `requestPermission()` method on the `PushNotificationsService`.

## Create Notification

You can create a permission calling the `create(title: string, options: PushNotification)` method, like this: 

```ts
this._push.create('Test', {body: 'something'}).subscribe(
            res => console.log(res),
            err => console.log(err)
        )
```

The `create()` method returns an observable that emits the notification and the event when ever a show, click, close or error event occurs.

If you don't have permission to display the notification then the `Permission not granted` error will be thrown.

## Options

The following are options that can be passed to the options parameter: 

```ts
interface PushNotification {
    body?: string
    icon?: string
    tag?: string
    renotify?: boolean
    silent?: boolean
    sound?: string
    noscreen?: boolean
    sticky?: boolean
    dir?: 'auto' | 'ltr' | 'rtl'
    lang?: string
    vibrate?: number[]
}
```

Options correspond to the Notification interface of the Notification API:
[Mozilla developer network](https://developer.mozilla.org/en-US/docs/Web/API/Notification).
