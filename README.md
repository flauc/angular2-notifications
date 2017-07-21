# Angular2-Notifications

> A light and easy to use notifications library for Angular 2. It features both regular page notifications (toasts) and push notifications. 

[![Build Status](https://travis-ci.org/flauc/angular2-notifications.svg?branch=master)](https://travis-ci.org/flauc/angular2-notifications)
[![NPM Version](https://img.shields.io/npm/v/angular2-notifications.svg)](https://www.npmjs.com/package/angular2-notifications)
[![NPM Downloads](https://img.shields.io/npm/dt/angular2-notifications.svg)](https://www.npmjs.com/package/angular2-notifications)

## Table of Contents

  - [Example](#example)
  - [Setup](#setup)
    - [SystemJS](#systemjs)
    - [Webpack](#webpack)
  - [Documentation](#documentation)

## Example

Take a look at the live demo here: [Live Demo](https://jaspero.co/resources/projects/ng-notifications)
You can also clone this repository and check out the example folder.

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

## Documentation 

* [Toast Notifications Documentation](https://github.com/flauc/angular2-notifications/tree/master/docs/toastNotifications.md)
* [Push Notifications Documentation](https://github.com/flauc/angular2-notifications/tree/master/docs/pushNotifications.md)
