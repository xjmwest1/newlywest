(function() {
  'use strict';

  angular
    .module('app')
    .directive('fullpage', fullpage);

  function fullpage() {
    var directive = {
      restrict: 'E',
      templateUrl: '/components/fullpage.html',
      scope: {
        currentPage: '='
      },
      controller: Controller,
      controllerAs: 'vm',
      bindToController: true,
      transclude: true
    };

    return directive;
  }

  Controller.$inject = ['$scope', '$location'];

  function Controller($scope, $location) {
    var vm = this;

    vm.currentPage = 0;
    
    $(document).ready(function() {
      $('#fullpage').fullpage({    
        onLeave: onLeave,
        afterLoad: afterLoad
      });
    });
    
    function onLeave(index, nextIndex, direction) {
      setCurrentPage(nextIndex);
      $scope.$apply();
    }
    
    function afterLoad(anchorLink, index) {
      setCurrentPage(index);
      $scope.$apply();
    }
    
    function setCurrentPage(currentPage) {
      vm.currentPage = currentPage;
    }
  }
    
    
})();