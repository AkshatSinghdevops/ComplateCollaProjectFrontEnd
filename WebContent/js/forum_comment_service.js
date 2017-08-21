'use strict';
 
angular.module('myApp').factory('MessageForumService', ['$http', '$q', function($http, $q){
 
    var REST_SERVICE_URI = 'http://localhost:8080/RestController/addMessageforum/';
    var REST_SERVICE_fetch_URI = 'http://localhost:8080/RestController/list_message_forum/';
    var factory = {
        fetchAllMessageForums: fetchAllMessageForums,
        createMessageForum: createMessageForum,
        singleForum:singleForum,
    };
 
    return factory;
 
    function fetchAllMessageForums(id) {
        var deferred = $q.defer();
        $http.get('http://localhost:8080/RestController/list_message_forum/',id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching MessageForums');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function createMessageForum(messageforum) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, messageforum)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating MessageForum');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
    function singleForum(id) {
        var deferred = $q.defer();
        $http.get('http://localhost:8080/RestController/list_message_forum/',id)
            .then(+
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating ChatForum');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
   
}]);