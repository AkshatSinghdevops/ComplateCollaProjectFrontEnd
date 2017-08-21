'use strict'; 
angular.module('myApp').factory('BlogService', ['$http', '$q', function($http, $q){
    var REST_SERVICE_URI = 'http://localhost:8080/RestController/addblog/';
    var REST_SERVICE_Update_URI = 'http://localhost:8080/RestController/manage_blog';
    var REST_SERVICE_Fetch_URI = 'http://localhost:8080/RestController/list_user_blog/';
    var factory = {
        fetchAllBlogs: fetchAllBlogs,
        createBlog: createBlog,
        updateBlog:updateBlog,
        getUserBlog: getUserBlog,
     };
 return factory;
    function fetchAllBlogs() {
        var deferred = $q.defer();
        $http.get("http://localhost:8080/RestController/blogs/")
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Blogs');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
    function  getUserBlog() {
    	console.log("enter getUserBlog in service")
        var deferred = $q.defer();
        $http.get("http://localhost:8080/RestController/userBlog/")
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Blogs');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function createBlog(blog) {
        var deferred = $q.defer();
        $http.post('http://localhost:8080/RestController/blog/create', blog)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating Blog');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
 
    function updateBlog(blog, id) {
        var deferred = $q.defer();
        $http.post('http://localhost:8080/RestController/blog/manage', blog)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating Blog');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
   
 
}]);