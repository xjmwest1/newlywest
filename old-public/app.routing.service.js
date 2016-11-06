(function() {
  'use strict';

  angular
    .module('app')
    .service('routing', routing);

  routing.$inject = ['$location', '$rootScope', '$timeout']

  function routing($location, $rootScope, $timeout) {

    var anchors = [
      {
        name: '',
        link: 'home/home.html'
      },
      {
        name: 'couple',
        link: 'couple/couple.html'
      },
      {
        name: 'bridesmaids',
        link: 'bridesmaids/bridesmaids.html'
      },
      {
        name: 'groomsmen',
        link: 'groomsmen/groomsmen.html'
      },
      {
        name: 'party',
        link: 'party/party.html'
      },
      {
        name: 'travel',
        link: 'travel/travel.html'
      },
      {
        name: 'registry',
        link: 'registry/registry.html'
      },
      {
        name: 'rsvp',
        link: 'rsvp/rsvp.html'
      }
    ];

    var fullPageOptions = {
      anchors: anchors.map(function(anchor) {
        return getAnchorName(anchor);
      }),
      lockAnchors: true,
      onLeave: onLeave,
      afterRender: afterRender
    }

    var initialLoad = true;

    var service = {
      anchors: anchors,
      fullPageOptions: fullPageOptions
    }

    return service;


    function getAnchorName(anchor) {
      return '#' + anchor.name + 'Anchor';
    }

    function getAnchor(path) {
      var cleanPath = path.replace(/\//g, '').trim();
      return anchors.find(function(anchor) { return anchor.name == cleanPath; });
    }
    
    function gotoAnchor(anchor) {
      var anchorName = getAnchorName(anchor);
      $timeout(function() {
        $.fn.fullpage.silentMoveTo(anchorName);
        $location.path('/' + anchor.name);
        $rootScope.$apply();
      }, 0);
    }

    function onLeave(index, nextIndex) {
      if(!initialLoad) {
        if(nextIndex && anchors.length >= nextIndex) {

          $location.path('/' + anchors[nextIndex - 1].name);
          if(!$rootScope.$$phase) {
            $rootScope.$apply();
          }
        }
      }
    }

    function afterRender() {
      var anchor = getAnchor($location.path());
      var listener = $rootScope.$on('anchors:loaded', function(event) {
        $timeout(function() {
          listener();
          gotoAnchor(anchor);
          initialLoad = false;
        }, 0);
      });
    }

  }
  
})();