
var app = angular.module("app", [] );
app.controller("appCtrl", function ($scope, $http) {
  console.log( ' app is going ' );
  $scope.updateid = '';
  $scope.deleteid = '';

  $scope.select_func = function() {
    $http.get('/api/pages').then(function success(res){
      console.log( ' get - ', res);
      $scope.select = res.data;
    }, function error(error){
      console.error(error.status); console.error(error.statusText);
    });
  };

  $scope.insert_func = function() {
    $http.post('/api/pages', {
       name : ' header ',
       body : []
    }).then(function success(res){
      console.log( ' post - ', res);
      $scope.insert = res.data;
    }, function error(error){
      console.error(error.status); console.error(error.statusText);
    });
  };

  $scope.update_func = function() {
    $http.put('/api/pages', {
       id : $scope.updateid,
       name : ' header ',
       body : [{ name: 'ndfdfdd', type: 'String'}]
    }).then(function success(res){
      console.log( ' put - ', res);
      $scope.update = res.data;
    }, function error(error){
      console.error(error.status); console.error(error.statusText);
    });
  };

  $scope.delete_func = function() {
    console.log( '/api/pages/?id='+$scope.deleteid );
    $http.delete('/api/pages/?id='+$scope.deleteid).then(function success(res){
      console.log( ' delete - ', res);
      $scope.delete = res.data;
    }, function error(error){
      console.error(error.status); console.error(error.statusText);
    });
  };

  $scope.show = function(){
    console.log( $scope.updateid );
  };

});
