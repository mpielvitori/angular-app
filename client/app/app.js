'use strict';

angular.module('applicationSample', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'smart-table',
  'feeds',
  'ngMaterial',
  'uiGmapgoogle-maps',
  'ngAnimate',
  'ngMessages',
  'reCAPTCHA',
  'ngImageInputWithPreview',
  'ngYoutubeEmbed',
  'blockUI',
  'chart.js'
]).config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $animateProvider, $mdThemingProvider,
                    reCAPTCHAProvider, blockUIConfig, ChartJsProvider, $mdDateLocaleProvider) {
  $mdDateLocaleProvider.formatDate = function(date) {
    if (date === undefined)
      return '';
    else
      return moment(date).format('DD/MM/YYYY');
  };

  /*$mdDateLocaleProvider.parseDate = function(dateString) {
    var m = moment(dateString, 'DD/MM/YYYY', true);
    return m.isValid() ? m.toDate() : new Date(NaN);
  };*/
  //ChartJsProvider.setOptions('Line', { bezierCurve: false });

  // Change the default overlay message
  //blockUIConfig.message('Cargando');
  blockUIConfig.autoBlock = true;
  blockUIConfig.resetOnException = false;
  blockUIConfig.delay = 0;
  blockUIConfig.message = 'Espere un momento, por favor';
  //blockUIConfig.template = '<div class="block-ui-message-container" aria-live="assertive" aria-atomic="true"><div class="ng-binding"><img ng-src="/assets/images/loader.gif"/></div></div>';
  // Change the default delay to 100ms before the blocking is visible

  // prod -> 6LehawkTAAAAAPnrmSW5Q3ypBlEpNJWx4wiBSiat
  // dev -> 6Lc_awkTAAAAAOeIgWIS8nYMxdhVCZcjBBaDaKYS
  reCAPTCHAProvider.setPublicKey('6LehawkTAAAAAPnrmSW5Q3ypBlEpNJWx4wiBSiat');

  // optional: gets passed into the Recaptcha.create call
  reCAPTCHAProvider.setOptions({
    lang : 'es',
    theme: 'red'
  });

    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      //.accentPalette('green')
      .warnPalette('deep-orange');
  //.backgroundPalette('grey');

    //$animateProvider.classNameFilter(/anim-/);
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    loading_screen.finish();

    //Funciones javascript
    Array.prototype.sum = function () {
      for(var total = 0,l=this.length;l--;total+=this[l]); return total;
    };

    Array.prototype.min = function () {
      return Math.min.apply(null, this);
    };

    Array.prototype.max = function () {
      return Math.max.apply(null, this);
    };
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })
  .run(function ($rootScope, $location, Auth, blockUI, $timeout) {
    $rootScope.$on('$stateChangeError',
      function(event, viewConfig){
        //blockUI.instances.get('mainBlockUI').stop();
        //console.log('error');
      });
    $rootScope.$on('$stateChangeSuccess',
      function(event, viewConfig){
        // Access to all the view config properties.
        // and one special property 'targetView'
        //$timeout(function() {
        //blockUI.instances.get('mainBlockUI').stop();
        //console.log('loaded');
        //}, 1700);
      });
      // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      //blockUI.instances.get('mainBlockUI').start();
      //console.log('start');
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/');
        }
      });
    });
  });
