# vjs-video

[![Build Status](https://travis-ci.org/LonnyGomes/vjs-video.svg)](https://travis-ci.org/LonnyGomes/vjs-video)

An angular js directive for video.js


## Dependencies

* video.js
* angular.js

## Installation

## Bower Install

The recomended method for installing `vjs-video` is by using bower

```bash
bower install vjs-video
```

Next include `angular`, `video.js`, the `vjs-video` directive and it's corresponding css.

```
<html ng-app="app">
  <head>
    <link rel="stylesheet" href="bower_components/video.js/dist/video-js/video-js.css" />
  </head>
  <body ng-app="app">
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/video.js/dist/video-js/video.js"></script>
    <script src="bower_components/vjs-video/dist/vjs.directive.js"></script>
</body>
</html>
```

If you are using [wiredep](https://github.com/stephenplusplus/grunt-wiredep) in a grunt or gulp configuration, all the required script and stylesheet includes will be injected into your html file.


## Basic usage

The `vjs-video` directive is designed to be non-invasive and easy to use. Add the directive to a video tag styled for video.js and it will  get bootstrapped to the video tag within your angular app.


Before using the directive, include it as a dependency within your angular app:

```javascript
angular
    .module('app', [ 'vjs.video']);

```

Add the directive to a video tag, using video.js parameters as normal and it will initialize your video tag

```
<video class="video-js vjs-default-skin" controls preload="auto" width="640" height="264" poster="poster.jpg" vjs-video>
    <source src="example_video.mp4" type="video/mp4">
</video>
```

## Responsive Container

The `vjs-container` directive enables responsive scaling of your video.js videos. By default it assumes a wide screen 16/9 ratio however any custom ratio can be supplied.

The following example wraps a video.js instance within a responsive container with a ratio of 4/3.

```
<vjs-video-container vjs-ratio="4/3">
    <video class="video-js vjs-default-skin" controls preload="auto" poster="poster.jpg">
        <source src="example_video.mp4" type="video/mp4">
    </video>
</vjs-video-container>
```

## Getting a reference to the videojs instance

The vjs directives dispatch an event after initialization. It can be accessed by listening on the scope for the `vjsVideoReady` event.

```
angular.module('app')
    .controller('MainCtrl', ['$scope', function (scope) {
        scope.$on('vjsVideoReady', function (e, data) {
            //data contains `id` and `vid`
            console.log('video id:' + data.id);
            console.log('video.js instance:' + data.vid);
        });
    }]);
```

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
