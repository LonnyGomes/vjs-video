'use strict';

/**
 * @ngdoc directive
 * @name vjsVideoApp.directive:vjs.directive.js
 * @description
 * # vjs.directive.js
 */
angular.module('vjsVideoApp')
  .directive('vjs.directive.js', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the vjs.directive.js directive');
      }
    };
  });
