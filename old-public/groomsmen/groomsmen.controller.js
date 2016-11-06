(function() {
  'use strict';

  angular
    .module('app')
    .controller('groomsmen.controller', Controller);

  function Controller() {
    var vm = this;
    
    vm.dudes = [
      {
        name: 'Chris',
        pic: '/images/chris.jpg',
        description: 'brother and best man'
      },
      {
        name: 'Zack',
        pic: '/images/zack.png',
        description: 'xc and high school'
      },
      {
        name: 'Nate',
        pic: '/images/chris.png',
        description: 'first best friend at 2-3 years old'
      },
      {
        name: 'JP',
        pic: '/images/chris.png',
        description: 'frat bro'
      },
      {
        name: 'Benji',
        pic: '/images/benji.jpg',
        description: 'frat big'
      },
      {
        name: 'Luke',
        pic: '/images/chris.png',
        description: 'roommate for 2 years'
      }
    ];

  }
    
})();