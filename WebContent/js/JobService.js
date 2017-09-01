
'use strict';

myApp.service('JobService', [
		'$http',
		'$q',
		'$rootScope',
		function($http, $q, $rootScope) {

			console.log("Job Service...")

			var BASE_URL = 'http://localhost:8080/RestController'

			return {
				
				
				createjob : function(job) {
					console.log("calling create job")
					return $http.post(BASE_URL + '/job/create', job) // 1
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while creating job');
						return $q.reject(errResponse);
					});
				},
				
				jobApplication : function(appliedJob) {
					
					return $http.post(BASE_URL + '/job/apply', appliedJob) // 1
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while applying job');
						return $q.reject(errResponse);
					});
				},
				
                   jobApplication : function(id) {
					
					return $http.post(BASE_URL + '/job/apply/'+ id) // 1
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while applying job');
						return $q.reject(errResponse);
					});
				},
				
				updateJobs : function(job) {
					console.log('Calling Update Job services')
					return $http.put(BASE_URL + '/job/update',job)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while update Job');
						return $q.reject(errResponse);
					});
				},
				
				
				updateAppliedJob : function(appliedJob) {
					console.log('Calling Update appliedJob services')
					return $http.put(BASE_URL + '/appliedJob/update',appliedJob)
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while update Job');
						return $q.reject(errResponse);
					});
				},
				
				
				
				fetchAlljob : function() {
					console.log("calling fetchAllJobs ")
					return $http.get(BASE_URL + '/list').then(
							function(response) {
								return response.data;
							}, null);
				},
				
				fetchuserAppliedJobs : function(id) {
					console.log("calling fetch Appled AllJobs service "+id)
					return $http.get(BASE_URL +  '/job-applied/'+id).then(
							function(response) {
								return response.data;
							}, null);
				},
				removeService : function(id) {
					console.log("calling removeService  " + id )
					return $http.get(BASE_URL +  '/Delete/' +id).then(          //Amin Method
							function(response) {
								return response.data;
							}, null);
				},
				AdminService : function() {
					console.log("calling AdminService ")
					return $http.get(BASE_URL +  '/listofapplieduser').then(          //Amin Method
							function(response) {
								return response.data;
							}, null);
				},
				
				getjob : function(id) {
					console.log("calling get Job " + id)
					return $http.get(BASE_URL + '/job/' + id).then(
							function(response) {
								return response.data;
							}, null);
				},
				
				
				
			}
		} ]);




/*
'use strict';
 
angular.module('myApp').factory('JobService', ['$http', '$q', function($http, $q){
 
    var REST_SERVICE_URI = 'http://localhost:8080/BackEndDemo/postAJob';
 
    var factory = {
        fetchAllJobs: fetchAllJobs,
        createJob: createJob,
        updateJob:updateJob,
        deleteJob:deleteJob    
    };
 
    return factory;
 
    function fetchAllJobs() {
        var deferred = $q.defer();
        $http.get('http://localhost:8080/BackEndDemo/list')
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Jobs');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function createJob(job) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, job)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating Job');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    
    function jobApplication(id) {
        var deferred = $q.defer();
        $http.post('http://localhost:8080/BackEndDemo/'+ '/job/apply/'+ id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating Job');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
    
    
    function updateJob(job, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+"/update", job)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating Job');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function deleteJob(id) {
        var deferred = $q.defer();
        $http['delete'](REST_SERVICE_URI+"/delete",id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
}]);*/