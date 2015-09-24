# vjs-video

[![Build Status](https://travis-ci.org/LonnyGomes/vjs-video.svg)](https://travis-ci.org/LonnyGomes/vjs-video)

An angular js directive for video.js


## Dependencies

* video.js
* angular.js

## Installation

## Bower Install

The recomended method for installing `vjs-video` is via bower

```bash
bower install vjs-video
```

The `vjs-video` also requires angular and video.js as dependencies and all files should be located within your `bower_components` folder. If you are using [wiredep](https://github.com/stephenplusplus/grunt-wiredep) in a grunt or gulp setup, all the required script includes will be injected into your html file


### Manual Install

If you are manually installing vjs-video be sure you already are including angular and video.js in your file first. Next include the `app/scripts/vjs.directive.js` file.


## Using the vjs-video directive

The `vjs-video` directive is designed to be non-invasive and easy to use. A`Add the directive to a video tag, usingYuse video.js parameters as normal, and video.js will get bootstrapped within your angular app.


Before using the directive, include it as a dependency within your angular app:

```javascript
angular
    .module('app', [ 'vjs.video']);

```

Add the directive to a video tag, using video.js parameters as normal, and it will your video within your angular app.

```
<video class="video-js vjs-default-skin" controls preload="auto" width="640" height="264" poster="poster.jpg" vjs-video>
    <source src="example_video.mp4" type="video/mp4">
</video>
```

## Using the vjs-video-container directive

The `vjs-container` directive enables responsive scaling of your video-js videos. By default it assumes a wide screen 16/9 ratio however any custom ratio can be supplied.

The following example wraps a video.js instance within a responsive container with a ratio of 4/3.

```
<vjs-video-container vjs-ratio="4/3">
    <video class="video-js vjs-default-skin" controls preload="auto" width="640" height="264" poster="poster.jpg">
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
