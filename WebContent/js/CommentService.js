/*'use strict'; 
angular.module('myApp').factory('BlogService', ['$http', '$q', function($http, $q){
   
    var factory = {
        
    		createComment: createComment
        
     };
 return factory;
  
    function createComment(blogcomment) {
        var deferred = $q.defer();
        $http.post("http://", blogcomment)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating ');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
 
  
   
 
}]);*/