'use strict';

angular.module('applicationSample')
  .controller('HomeCtrl', function ($scope) {
    $scope.myInterval = 5000;
    var slides = [];
    slides.push({
      image: 'static/images/coreos.png',
      text: ''
    });
    slides.push({
      image: 'static/images/command.jpg',
      text: ''
    });
    $scope.slides = slides;
  });
