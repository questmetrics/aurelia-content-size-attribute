# aurelia-content-size-attribute

[![TravisCI](https://travis-ci.com/questmetrics/aurelia-content-size-attribute.svg?branch=master)](https://travis-ci.com/questmetrics/aurelia-content-size-attribute)

A custom attribute for managing common element size observation and changes notification

## Installation

  ```
  npm install aurelia-content-size-attribute --save
  ```

## Development

  * Standard process: pull, install and build
    ```
    npm install
    npm run build
    ```

## Test

  ```
  npm run test
  ```

## Plugin Configuration

  Simplest form of plugin configuration:

  ```js
  // main.js
  import { configure as configureContentSizeAttribute } from 'aurelia-content-size-attribute';

  export function main(aurelia) {
    aurelia
      .use
      .plugin(configureContentSizeAttribute)

    // ...
  }
  ```

  The plugin uses [`ResizeObserver`](https://developers.google.com/web/updates/2016/10/resizeobserver), which is quite a new feature of the web,
  which mean you may want to supply your own polyfill. Recommended polyfill at https://github.com/que-etc/resize-observer-polyfill . By default, the plugin uses the default `ResizeObserver` in global of `PLATFORM`, but you can override this by specifying it in 2nd parameter of plugin configuration:

  ```js
  // main.js
  import { configure as configureContentSizeAttribute } from 'aurelia-content-size-attribute';
  import ResizeObserver from 'resize-observer-polyfill';

  export function main(aurelia) {
    aurelia
      .use
      .plugin(configureContentSizeAttribute, { resizeObserver: ResizeObserver })

    // ...
  }

  ```

## Usage

  Annotate any element that has its **content size** that needs to be observed with attribute `content-size` and `bind` command. like the following:

  ```html
  <!-- app.html -->
  <template>
    <div class='container' content-size.bind="containerSize">

    </div>
  </template>
  ```

  By default, the binding direction is `from-view`, which means only the custom attribute will notify the view model it resides in. (And the other direction doesn't make sense).

## Problem & solution

  Sometimes in an application, it is desirable to be notified after dimension of an element has changed. There are many valid reasons for this: to adjust display, to reform functionalities. The causes are from many places: it could be because new content has been added to the element or some css effect / pseudo elements like `:before` & `:after`.

  There is standard feature at `ResizeObserver` for this purpose. This plugin (read `content-size` attribute) is a convenient way to use the observer in an Aurelia application.

