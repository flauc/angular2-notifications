# Angular2-Notifications

> A light and easy to use notifications library for Angular 2. ~~It features both regular page notifications (toasts) and push notifications.~~ 

[![Build Status](https://travis-ci.org/flauc/angular2-notifications.svg?branch=master)](https://travis-ci.org/flauc/angular2-notifications)
[![NPM Version](https://img.shields.io/npm/v/angular2-notifications.svg)](https://www.npmjs.com/package/angular2-notifications)
[![NPM Downloads](https://img.shields.io/npm/dt/angular2-notifications.svg)](https://www.npmjs.com/package/angular2-notifications)

**Push Notifications have been moved to a separate library [ng-push](https://github.com/flauc/ng-push)**

## Table of Contents

  - [Example](#example)
  - [Setup](#setup)
    - [SystemJS](#systemjs)
    - [Webpack](#webpack)
  - [Setup](#setup)
  - [Creating Notifications](#crating-notifications)
    - [Example using TemplateRef](#example-using-templateref)
  - [Subscribing to clicks](#subscribing-to-clicks)
  - [Options](#options)

## Example

Take a look at the live demo here: [Live Demo](https://stackblitz.com/edit/angular2-notifications-example)

## Setup

Install the library

```sh
npm install --save angular2-notifications
# Or using Yarn for a faster installation
yarn add angular2-notifications
```

### SystemJS

Map the library in your `system.config.js` if you're using SystemJs.

```js
var map = {
    'angular2-notifications': 'node_modules/angular2-notifications'
}

var packages = {
    'angular2-notifications': { main: './dist/index.js', defaultExtension: 'js' }
}
```

### Webpack

If you're using Webpack >= 2, just include the library in your `main.ts` or `vendor.ts` file

```ts
import 'angular2-notifications';
```

## Setup

Import the `SimpleNotificationsModule` in to your root `AppModule` (it will not work if you try to import it into a shared module)
```ts
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
    imports: [
        BrowserModule,
        // Animations need to be imported in to your project to use the library
        BrowserAnimationsModule, 
        SimpleNotificationsModule.forRoot()
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
```


Add the SimpleNotificationsComponent in to the component where you want to use the notifications. Or in your top level component for use in child components.
```js
...
template: '<simple-notifications></simple-notifications>'
...
```

You will also need to use the NotificationsService in your component to create or remove the notifications.
```js
...
constructor( private _service: NotificationsService ) {}
...
```

The create and destroy Event Emitters emit the notification that was created or destroyed you can utilise this functionality like this:
```js
<simple-notifications [options]="options" (create)="created($event)" (destroy)="destroyed($event)"></simple-notifications>
```

**If your app cannot find the built JS files for this package,** you may need to tell your build script to scan the `angular2-notifications` directory. See the related issue [#25](https://github.com/flauc/angular2-notifications/issues/25). Example:

```js
'angular2-notifications/*.+(js|js.map)',
'angular2-notifications/lib/*.+(js|js.map)'
```

## Creating Notifications

This are the currently available access methods:

* The access methods return the constructed notification along with the created id.

| Method | Description
---| ---
`success(title: any, content?: any, override?: any, context?: any)` | Creates a success notification with the provided title and content.
`error(title: any, content?: any, override?: any, context?: any)`  | Creates an error notification with the provided title and content.
`alert(title: any, content?: any, override?: any, context?: any)` | Creates an alert notification with the provided title and content.
`warn(title: any, content?: any, override?: any, context?: any)` | Creates a warn notification with the provided title and content.
`info(title: any, content?: any, override?: any, context?: any)` | Creates an info notification with the provided title and content.
`bare(title: any, content?: any, override?: any, context?: any)` | Creates a bare notification with the provided title and content. This notification type is best used when adding custom html.
`create(title: any, content: any = '', type: string = 'success', override?: any, context?: any)` | Use this method to create any notification type ['success', 'error', 'alert', 'info', 'bare'].
`html(html: any, type: string = 'success', override?: any, icon: string = 'bare', context?: any)` | Use this method to create a notification with custom html. By specifying an icon (success, error, alert, info or warn) you can use the default icons in addition to your custom html. If you do not explicitly pass an icon param no icon will be shown by default.
`remove(id?: string)` | Removes the notification that has the provided id or removes all currently open notifications if no id was provided.

The `title`, `content` and `html` arguments can be a string, html string or `TemplateRef`. Now it's also possible to pass the datas (context) to the `TemplateRef` by using the optional `context` argument.

### Example using `TemplateRef`

To use a `TemplateRef` in the title or content you need to create it in a component template: 

```html
<ng-template #example let-title="title">
    <p>{{title}}</p>
</ng-template>
```

Then you need to somehow get it to the component: 

```ts
  title: string = 'Winter is coming';
  @ViewChild('example') example: TemplateRef<any>;

  open() {
    let context: any = {title: this.title};
    this._service.html(this.example, null, null, null, context);
  }
```

You could also pass the template through the `open()` method:

```ts
    open(temp: TemplateRef<any>) {
        this._service.html(temp, null, null, null, context);
    }
```

## Subscribing to clicks
If you are interested in the clicks that happen on a notification you have
the possibility to subscribe to a EventEmitter. The methods (success, error, alert, warn, info, bare, create and html) from the
NotificationsService return an Object of type Notification.

```js
const toast = this.notificationsService.success('Item created!', 'Click to undo...', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
```

The returned object has a click property with an EventEmitter on it which you can subscribe to. Your callback then gets notified with the click event
at each click that happens on your Notification.

```
toast.click.subscribe((event) => {
    doSomething(event)
});
```

If you have configured the notification to close when the icon is clicked, an EventEmitter exists to listen for those clicks as well.

```js
const toast = this.notificationsService.success('Item created!', 'Click to undo...', {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: false,
      clickIconToClose: true
    });
```

With the corresponding clickIcon property as above.

```
toast.clickIcon.subscribe((event) => {
    doSomething(event)
});
```

## Options

Global options can be added in two ways. They can be passed through the `forRoot()` method on the module.

```js
SimpleNotificationsModule.forRoot({
    ...options
})
```

You can also pass them in to the root component.

```js
<simple-notifications [options]="options"></simple-notifications>
```

This are the current options that can be set globally:

Option | Type | Default | Description |
------------ | ------------- | ------------- | -------------
__position__ | ["top" or "bottom" or "middle", "right" or "left" or "center"] | ["bottom", "right"] | Set the position on the screen where the notifications should display. Pass an array with two values example: ["top", "left"]. 
__timeOut__ | int | 0 | Determine how long a notification should wait before closing. If set to 0 a notification won't close it self.
__showProgressBar__ | boolean | true | Determine if a progress bar should be shown or not.
__pauseOnHover__ | boolean | true | Determines if the timeOut should be paused when the notification is hovered.
__lastOnBottom__ | boolean | true | Determines if new notifications should appear at the bottom or top of the list.
__clickToClose__ | boolean | true | Determines if notifications should close on click.
__clickIconToClose__ | boolean | false | Determines if notifications should close when user clicks the icon.
__maxLength__ | int | 0 | Set the maximum allowed length of the content string. If set to 0 or not defined there is no maximum length.
__maxStack__ | int | 8 | Set the maximum number of notifications that can be on the screen at once.
__preventDuplicates__ | boolean | false | If true prevents duplicates of open notifications.
__preventLastDuplicates__ | boolean or string | false | If set to "all" prevents duplicates of the latest notification shown ( even if it isn't on screen any more ). If set to "visible" only prevents duplicates of the last created notification if the notification is currently visible.
__theClass__ | string | null | A class that should be attached to the notification. (It doesn't exactly get attached to the selector but to the first div of the template.)
__rtl__ | boolean | false | Adds the class `.rtl-mode` to the notification aligning the icon to the left and adding `direction: rtl`
__animate__ | "fade" or "fromTop" or "fromRight" or "fromBottom" or "fromLeft" or "scale" or "rotate" or null | "fromRight" | Choose the type of animation or set the value to null not to display animations.
__icons__ | Icons | DefaultIcons | Overrides the default icons

## Icons

Option | Type | Default | Description |
------------ | ------------- | ------------- | -------------
__alert__ | string | Clock | html string for alert icon
__error__ | string | Exclamation Point | html string for alert icon
__info__ | string | Info | html string for alert icon
__warn__ | string | Warning | html string for warning icon
__success__ | string | Check | html string for alert icon

Here is an example of passing the options to the component. You only pass the options you want changed.
Options passed to the component are global. They apply to all of the notifications the get created.

```js
...
template: '<simple-notifications [options]="options"></simple-notifications>'
...
public options = {
    position: ["bottom", "left"],
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
* clickIconToClose
* maxLength
* theClass
* icon

This is an example of overriding global options:
```js
this._notificationsService.success(
    'Some Title',
    'Some Content',
    {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    }
)
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Filip Lauc](mailto:filip.lauc93@gmail.com)