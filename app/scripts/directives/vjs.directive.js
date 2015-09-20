/*global angular */

/**
 * @ngdoc directive
 * @name vjsVideoApp.directive:vjs.directive.js
 * @description
 * # vjs.directive.js
 */
(function () {
    'use strict';

    var module = angular.module('vjs.video', []);

    function getVidElement(element, isContainer) {
        var vid = null,
            videos;

        if (!window.videojs) {
            throw new Error('video.js was not found!');
        }

        if (isContainer) {
            videos = element[0].getElementsByTagName('video');
            if (videos.length === 0) {
                throw new Error('video tag must be defined within container directive!');
            } else if (videos.length > 1) {
                throw new Error('only one video can be defined within the container directive!');
            }

            vid = videos[0];
        } else {
            if (element[0].nodeName === 'VIDEO') {
                vid = element[0];
            } else {
                throw new Error('directive must be attached to a video tag!');
            }
        }

        return vid;
    }

    function applyRatio(el, ratioVal) {
        var ratio = ratioVal,
            style = document.createElement('style'),
            parseRatio = function (r) {
                var tokens = r.split('/'),
                    tokenErrorMsg = 'the ratio must either be "wide", "standard" or ' +
                                    'decimal values in the format of w/h';

                //if invalid ratio throw an error
                if (tokens.length !== 2) {
                    throw new Error(tokenErrorMsg);
                }

                //confirm that both tokens are numbers
                if (isNaN(tokens[0]) || isNaN(tokens[1])) {
                    throw new Error(tokenErrorMsg);
                }

                //confirm that the width or height is not zero
                if (Number(tokens[0]) === 0 || Number(tokens[1]) === 0) {
                    throw new Error('neither the width or height ratio can be zero!');
                }

                return (Number(tokens[1]) / Number(tokens[0])) * 100;
            },
            genContainerId = function (element) {
                var container = element[0].querySelector('.video-js'),
                    vjsId;

                if (container) {
                    vjsId = 'vjs-container-' + container.getAttribute('id');
                } else {
                    //vjsId = 'vjs-container-default';
                    throw new Error('Failed to find instance of video-js class!');
                }

                //add generated id to container
                element[0].setAttribute('id', vjsId);

                return vjsId;
            },
            containerId,
            ratioPercentage,
            css;

        //if ratio isn't defined lets default to wide screen
        if (!ratio) {
            ratio = '16/9';
        }

        switch (ratio) {
        case 'wide':
            ratio = '16/9';
            break;
        case 'standard':
            ratio = '4/3';
            break;
        }

        containerId = genContainerId(el);

        ratioPercentage = parseRatio(ratio);

        css = ['#', containerId, ' ',
               '.video-js {padding-top:', ratioPercentage,
               '%;}\n', '.vjs-fullscreen {padding-top: 0px;}'].join('');

        style.type = 'text/css';
        style.rel = 'stylesheet';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        el[0].appendChild(style);
    }

    function initVideoJs(vid, scope, element) {
        var opts = scope.vjsSetup || {},
            ratio = scope.vjsRatio;

        if (!window.videojs) {
            return null;
        }

        //bootstrap videojs
        window.videojs(vid, opts, function () {
            if (element[0].nodeName !== 'VIDEO') {
                applyRatio(element, ratio);
            }
        });

        //dispose of videojs before destroying directive
        scope.$on('$destroy', function () {
            window.videojs(vid).dispose();
        });
    }

    module.directive('vjsVideo', function () {
        return {
            restrict: 'A',
            transclude: true,
            scope: {
                vjsSetup: '='
            },
            link: function postLink(scope, element, attrs, ctrl, transclude) {
                var vid = getVidElement(element);

                //attach transcluded content
                transclude(function (content) {
                    element.append(content);
                });

                initVideoJs(vid, scope, element);
            }
        };
    });

    module.directive('vjsVideoContainer', function () {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'scripts/directives/vjs.container.html',
            scope: {
                vjsSetup: '=',
                vjsRatio: '@'
            },
            link: function postLink(scope, element, attrs, ctrl) {
                var vid = getVidElement(element, true),
                    ratio = scope.vjsRatio;

                //set width and height of video to auto
                vid.setAttribute('width', 'auto');
                vid.setAttribute('height', 'auto');

                //bootstrap video js
                initVideoJs(vid, scope, element);

                //apply ratio to element
                //applyRatio(element, ratio);
            }
        };
    });
}());
