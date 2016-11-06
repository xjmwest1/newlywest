(function() {
  'use strict';

  angular
    .module('app')
    .controller('app.controller', Controller);

  Controller.$inject = ['routing', '$rootScope'];
  
  function Controller(routing, $rootScope) {
    var vm = this;    

    vm.anchors = routing.anchors;
    vm.fullPageOptions = routing.fullPageOptions;
    
    vm.anchorLoaded = function(loadedAnchor) {      
      var allLoaded = vm.anchors.every(function(anchor) {
        if(loadedAnchor == anchor) {
          anchor.loaded = true;
        }
        
        return anchor.loaded;
      });
      
      if(allLoaded) {
        $rootScope.$broadcast('anchors:loaded');
      }
    }

  }
    
})();