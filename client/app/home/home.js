'use strict';

angular.module('applicationSample')
  .config(function ($stateProvider) {
    $stateProvider
      .state('public', {
        views : {
          'menu' : {
            templateUrl: 'app/home/navbar/navbar.html',
            controller: 'NavbarCtrl'
          },
          'footer' : {
            templateUrl: 'static/footer.html'
          }
        }
      })
      .state('public.home', {
        url: '/',
        views : {
          'header@' : {
            templateUrl: 'static/slider.html',
            controller: 'HomeCtrl'
          },
          'body@' : {
            templateUrl: 'static/content.html'
          }
        }
      })
      .state('public.about', {
        url: '/about',
        views : {
          'body@' : {
            templateUrl: 'app/home/about/aboutContent.html',
            controller: 'AboutCtrl'
          }
        }
      })
      .state('public.contact', {
        url: '/contact',
        views : {
          'body@' : {
            templateUrl: 'app/home/contact/contactContent.html',
            controller: 'ContactCtrl'
          }
        }
      });
  });

