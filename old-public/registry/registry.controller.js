(function() {
    'use strict';

    angular
      .module('app')
      .controller('registry.controller', Controller);

    function Controller() {
      var vm = this;

      vm.registries = [
        {
          name: 'Amazon',
          link: 'http://www.amazon.com',
          image: '/images/amazon.png'
        },
        {
          name: 'Target',
          link: 'http://www.target.com',
          image: '/images/target.png'
        }
      ]
      
    }
    
})();