# vjs-video

[![Build Status](https://travis-ci.org/LonnyGomes/vjs-video.svg)](https://travis-ci.org/LonnyGomes/vjs-video)

An angular.js directive for video.js

With `vjs-video` you can easily incorporate video into your Angular projects using the roubust HTML video player `video.js`. The directive also adds additional features such as data-binded media sources and a responsive video container (for video.js 4.x). `vjs-video` works 4.x and 5.x versions of `video.js` just in case you're not ready to upgrade.

## Dependencies

* video.js >= 4.x
* angular.js >= 1.3

## Installation

## Bower Install

The recomended method for installing `vjs-video` is via bower

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

> If you are leveraging [wiredep](https://github.com/stephenplusplus/grunt-wiredep) in your build workflow, all the required script and stylesheet includes will be injected into your html file.


## Basic usage

The `vjs-video` directive is designed to be non-invasive and easy to use. Add the directive to a video tag styled for video.js and that's all that's needed to initialize the `video.js` libaray on your video.


Before using the directive, be sure to include it as a dependency within your angular app:

```javascript
angular
    .module('app', [ 'vjs.video']);

```

Add the directive to a video tag, using video.js parameters as normal and it will initialize your video tag

```
<video class="video-js vjs-default-skin" controls preload="auto"
       width="640" height="264" poster="poster.jpg" vjs-video>
    <source src="example_video.mp4" type="video/mp4">
</video>
```

## Responsive Container

The `vjs-container` directive implments responsive scaling for your video.js videos. By default it assumes a wide screen 16:9 ratio however any custom ratio can be supplied.

> responsive video comes shipped with video.js 5.0 and should be used instead; however if used with 5.0, `vjs-container` the aspect ratio values are passed through to `video.js`.

The following example wraps a video.js instance within a responsive container with a ratio of 4:3.

```
<vjs-video-container vjs-ratio="4:3">
    <video class="video-js vjs-default-skin" controls preload="auto" poster="poster.jpg">
        <source src="example_video.mp4" type="video/mp4">
    </video>
</vjs-video-container>
```
## Directive Attributes

The vjs-directive supports optional attributes to extend capabilities.

* vjs-setup - an alternative to using data-setup on the video element
* vjs-media - an alternative way of defining for sources and tracks
* vjs-ratio - _(only for `vjs-video-container`)_ defines the aspect ratio in the format width:height.

### vjs-setup

You can use `vjs-setup` instead of the `data-setup` attribute `video.js` uses if you would prefer to define all of the properties on the scope vs an inline JSON string.

The following example will set the loop option for the `video.js` instance using the `vjs-setup` attribute:

#### HTML

```
<video class="video-js vjs-default-skin" controls preload="auto"
       width="640" height="264" vjs-video vjs-setup="options">
    <source src="http://video-js.zencoder.com/oceans-clip.mp4" type='video/mp4' />
</video>
```

#### JavaScript
```
angular.module('app')
    .controller('MainCtrl', ['$scope', function (scope) {

        scope.options = {
            loop: true
        };
    }]);
```

### vjs-media

The `vjs-media` option expects a reference to an object that contains a `sources`, `tracks`, and/or `poster` element. Whenever the `vjs-media` value is changed, `video.js` is reinitialized given the new data.

The following example defines a poster image, two sources and one track in a scope variable that is processed by `vjs-video`.

#### HTML

```
<video class="video-js vjs-default-skin" controls preload="auto"
       width="592" height="252" vjs-video vjs-media="mediaToggle">
</video>
```
#### JavaScript
```JavaScript
angular.module('app')
    .controller('MainCtrl', ['$scope', function (scope) {
        scope.mediaToggle = {
            sources: [
                {
                    src: 'images/happyfit2.mp4',
                    type: 'video/mp4'
                },
                {
                    src: 'images/happyfit2.webm',
                    type: 'video/webm'
                }
            ],
            tracks: [
                {
                    kind: 'subtitles',
                    label: 'English subtitles',
                    src: 'assets/subtitles.vtt',
                    srclang: 'en',
                    default: true
                }
            ],
            poster: 'images/screen.jpg'
        };
    }]);
```

### vjs-ratio

The `vjs-ratio` only works in conjunction with the `vjs-video-container` directive. The value should list width and then height separated by a `:` `(w:h)`. The value can be the actual width and height or the least common denominator such as `16:9`.

## Getting a reference to the videojs instance

There are times will you will want to get access to the video object that `video.js` creates. The vjs directive dispatches an event after initialization and can be accessed by listening on the scope for the `vjsVideoReady` event.

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
