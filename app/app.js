'use strict';

var app = angular.module('Scena', ['ngMaterial']);

app.controller('RootController', ['$http', function($http){
  var root = this;
  root.sections = [];
  root.addingNewSection = false;

  root.getSections = function() {
    $http({
        method: "GET",
        url:'http://localhost:3000/filtering/'
      })
      .then(
        function(response){
          root.sections = response.data;
        }
      );
  };

  root.save = function (new_section) {
    var data = angular.toJson(new_section)
    $http({
        method: "POST",
        url:'http://localhost:3000/filtering/',
        data: data
      })
      .then(
        function(response){
        }
      );
  };

  root.remove = function (section_id) {
    for(var i = root.sections.length - 1; i >= 0; i--) {
        if(root.sections[i].id === section_id) {
           root.sections.splice(i, 1);
        }
    }
    $http({
        method: "DELETE",
        url:'http://localhost:3000/filtering/'+section_id
      })
      .then(
        function(response){
        }
      );
  };

  root.add = function (new_section) {
    new_section.stories = [];
    root.sections.push(angular.copy(new_section));
    root.save(new_section);
    root.reset(new_section);
  };

  root.reset = function (new_section) {
    new_section.title="";
  };

  root.getSections();

}]);

app.directive('addNewSection', function() {
  return {
    restrict: "E",
    templateUrl: "add-new-section.html"
  }
});

app.directive('section', function() {
  return {
    restrict: "E",
    templateUrl: "section.html"
  }
});

app.directive('story', function() {
  return {
    restrict: "E",
    templateUrl: "story.html"
  }
});
