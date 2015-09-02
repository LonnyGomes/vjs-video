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

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
