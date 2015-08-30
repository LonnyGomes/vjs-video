# vjs-video

An angular js directive for video.js


## Dependencies

* video.js
* angular.js

## Using the vjs-video directive

The `vjs-video` directive is designed to be non-invasive and easy to use. Ensure that video.js is loaded and then add the directive to a video tag. You can use video.js parameters as normal and it will get bootstrapped within your angular app.

```
<video class="video-js vjs-default-skin" controls preload="auto" width="640" height="264" poster="poster.jpg" vjs-video>
    <source src="example_video.mp4" type="video/mp4">
</video>
```

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
