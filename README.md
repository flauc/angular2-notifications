# Angular2-Notifications
A light and easy to use notifications library for Angular 2. It features both regular page notifications (toasts) and push notifications. 

## Example
Take a look at the live demo here: [Live Demo](http://flauc.github.io/angular2-notifications)
You can also clone this repository and check out the example folder.

## Setup
Download the library with npm
```
npm install --save angular2-notifications
```

Map the library in your `system.config.js` if you're using SystemJs.
```js
var map = {
    'notifications': 'node_modules/angular2-notifications'
}

var packages = {
    'notifications': { main: 'components.js', defaultExtension: 'js' }
}
```

## Documentation 

I have moved the rest of the documentation in to separate files. Since the implementation of regular page notifications (toasts) and push notifications is quit a bit different.

Im currently working on push notifications, they are already available but its only a basic implementation. 
They should be fully functional in the next big release which will come in a few days. 

* [Toast Notifications Documentation](https://github.com/flauc/angular2-notifications/tree/master/docs/toastNotifications.md)
* [Push Notifications Documentation](https://github.com/flauc/angular2-notifications/tree/master/docs/pushNotifications.md)

