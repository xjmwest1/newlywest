(function() {
    'use strict';

    angular
      .module('app')
      .controller('rsvp.controller', Controller);

    Controller.$inject = ['$http', '$scope'];
  
    function Controller($http, $scope) {
      var vm = this;
      
      vm.rsvpFormPage = 0;
      vm.rsvp = {
        first: null,
        last: null
      };
      vm.alreadyRsvp = false;
      vm.checkingForRsvp = false;
      vm.numguests = 0;
      vm.guests = [];

      vm.checkRsvp = checkRsvp;
      vm.submitRsvp = submitRsvp;
      vm.changeGuests = changeGuests;
      
      // checks if form has valid first and last inputs
      // returns whether or not the person has already rsvp-ed
      function checkRsvp() {
        if(vm.rsvp.first && vm.rsvp.last) {
          vm.checkingForRsvp = true;
          $http.get('/rsvp/first/' + vm.rsvp.first.toLowerCase() + '/last/' + vm.rsvp.last.toLowerCase()).then(function(response) {
            vm.checkingForRsvp = false;
            vm.alreadyRsvp = (response.data != null);
          }, function(err) {
            vm.checkingForRsvp = false;
            vm.alreadyRsvp = false;
          });
        }
      }
      
      function submitRsvp() {
        // lowercase the name and email
        vm.rsvp.first = vm.rsvp.first.toLowerCase();
        vm.rsvp.last = vm.rsvp.last.toLowerCase();
        vm.rsvp.email = vm.rsvp.email.toLowerCase();
        
        // remove all non-digits from phone number
        vm.rsvp.phone = vm.rsvp.phone.replace(/\D/g,'');
        
        
        $http.post('/rsvp', vm.rsvp).then(function(response) {
          console.log(response.data);
          if(response.data && response.data.ok) {
            vm.rsvpFormPage = vm.rsvpFormPage + 1;
          }else {
            console.log(response);
          }
        }, function(err) {
          console.log(err);
        });
      }
      
      function changeGuests() {
        var currNumGuests = getCurrNumGuests();
        
        while(currNumGuests > vm.numguests) {
          vm.guests.push(vm.rsvp.guests.pop());
          currNumGuests = getCurrNumGuests();
        }
        
        while(currNumGuests < vm.numguests) {
          if(!vm.rsvp.guests) vm.rsvp.guests = [];
          
          vm.guests.length > 0 ? vm.rsvp.guests.push(vm.guests.pop()) : vm.rsvp.guests.push({});
          currNumGuests = getCurrNumGuests();
        }
      }
      
      function getCurrNumGuests() {
        return vm.rsvp.guests ? vm.rsvp.guests.length : 0;
      }
    }
    
})();