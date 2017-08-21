'use strict';

myApp.controller('JobController', [
		'$scope',
		'JobService',
		'$location',
		'$rootScope',
		'$cookieStore',
		'$window',
		'$http',
		'$routeParams',
		'$filter',
		function($scope, JobService, $location, $rootScope, $cookieStore,
				$window, $http, $routeParams, $filter) {

			$scope.job = {
				id : '',
				title : '',
				qualification : '',
				status : '',
				dateTime : '',
				description : '',
				errorCode : '',
				errorMessage : '',
				applied_user_job : ''
			};
			$rootScope.my_id = []
			$rootScope.appliedjob = {
					id : '',
					user_id : '',
					job_id : '',
					status : '',
					date_time : '',
					remarks : '',
					errorCode : '',
					errorMessage : ''
				};
			
			$scope.appliedJob = {
					
					id : '',
					user_id : '',
					job_id : '',
					status : '',
					date_time : '',
					remarks : '',
					errorCode : '',
					errorMessage : ''	
					
			};
		    	
			var param2 = $routeParams.param2;
			$scope.jobs = [];

			$scope.createJob = function(job) {

				console.log(job.title)
				console.log("create job STarted...")
				JobService.createjob(job).then(function(d) {

					$scope.job = {};
					$scope.suMessage = 'True';
					$location.path("/listjob")
				}, function(errResponse) {
					console.error('Error while creating Job.');
				});
			};

			$scope.job_create = function() {
				{
					console.log('Saving New Job' + $scope.job.id);
					$scope.createJob($scope.job);
				}

			};
			$scope.getJobs = function() {

				console.log("fetchAllJobs...")
				JobService.fetchAlljob().then(function(d) {
					$scope.jobs = d;
					
					//alert(JSON.stringify($rootScope.appliedjob))
				}, function(errResponse) {
					console.error('Error while fetching Job');
				});

			};

			$scope.getAllJob = function(id) {
				{
					console.log('Fetching All Job');
					$scope.getJobs();
					
				}

			};

			$scope.getJobById = function(id) {

				console.log("Get job..." + id)
				JobService.getjob(id).then(function(d) {
					$scope.job = d;
					$scope.job.dateTime = new Date($scope.job.dateTime);
					// alert($scope.job.date_time);

				}, function(errResponse) {
					console.error('Error while fetching Job');
				});

			};

			$scope.jobEdit = function(id) {
				console.log('Get  Job By Id ' + id);
				$scope.getJobById(id);
			}
			$scope.updateJob = function(){
				JobService.updateJobs($scope.job).then(function(d) {
					$scope.job = {};
					$scope.getAllJob()
					$location.path("/listjob")
				},
				function(errResponse){
					console.error('Error while updating Job')
					
				});
				
			};
			$scope.job_update = function(){
				console.log('Updating Job started '+$scope.job.id)
				$scope.updateJob($scope.job)
			}
			
			$scope.applyJob = function(appliedJob) {                //apply

			
				console.log("Apply Job..."+appliedJob.job_id)
				JobService.jobApplication(appliedJob).then(function(d) {
					$scope.fetchuserApplied($rootScope.currentUser.id)

					$scope.show(appliedJob.job.id)
					
				}, function(errResponse) {
					console.error('Error while Applying Job.');
				});
			};
			
			$scope.jobApply = function(id) {
				
				$scope.appliedJob.job_id = id;
				console.log('Applying Job '+$scope.appliedJob.job_id)
				$scope.applyJob($scope.appliedJob)
				JobService.jobApplication(id).then(function(d) {
					$scope.fetchuserApplied($rootScope.currentUser.id)
                    alert("Thank you for applying Job")
					//$scope.show(appliedJob.job.id)
					
				}, function(errResponse) {
					console.error('Error while Applying Job.');
				});
			}
			                                                        //apply
			$scope.fetchuserApplied = function(id) {

				console.log("fetchAllJobs..."+id)
				JobService.fetchuserAppliedJobs(id).then(function(d) {
					$rootScope.appliedjob = d;
					
					 angular.forEach($rootScope.appliedjob, function(value, key) {
					      console.log('key:', key);
					      console.log('value:', value.id);
					      $rootScope.my_id.push(value.job_id);
					    });
					
					
				}, function(errResponse) {
					console.error('Error while fetching Job');
				});

			};
			$scope.getUserAppJob = function(id){
				if($scope.jobs.id == null || $scope.jobs.id == undefined ){

					console.log("test is not defined");
					}
					else{
					console.log("test is defined ",id); 
					}
				//$scope.appliedJob.job_id = id;
				console.log('////////// '+id)
				console.log("enter getUserAppJob>>>>>>>>>"+id)
				$scope.fetchuserApplied(id);
			}
			
			$scope.show = function(val) {
				//console.log('aaaa'+val)
				var items = $rootScope.my_id;
				//console.log('azx '+$filter('filter')(items, val).length)
				return $filter('filter')(items, val).length > 0;;;
				$location.path("/job")
			}
			
			
			$scope.reset = function(job){
			        $scope.job={id:null,title:'',qualification:'',description:'',dateTime:''};
			        $scope.myForm.$setPristine(); //reset Form
			    }
               
			
			
			$scope.AdminS = function() {
				

					console.log("[][][]][][][][][][][][][][]...")
					JobService.AdminService().then(function(d) {
						$scope.jobs = d;
						
						//alert(JSON.stringify($rootScope.appliedjob))
					}, function(errResponse) {
						console.error('Error while fetching Job');
					});

				};
		} ]);





/*'use strict';
 
angular.module('myApp').controller('JobController', ['$scope', 'JobService','$rootScope', function($scope, JobService,$rootScope) {
    var self = this;
    self.job={id:null,title:'',qualification:'',description:'',dateTime:''};
    self.jobs=[];
 
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
    $scope.job = {
			id : '',
			title : '',
			qualification : '',
			status : '',
			date_time : '',
			description : '',
			errorCode : '',
			errorMessage : '',
			applied_user_job : ''
		};
		$rootScope.my_id = []
		$rootScope.appliedjob = {
				id : '',
				user_id : '',
				job_id : '',
				status : '',
				date_time : '',
				remarks : '',
				errorCode : '',
				errorMessage : ''
			};
		
		$scope.appliedJob = {
				
				id : '',
				user_id : '',
				job_id : '',
				status : '',
				date_time : '',
				remarks : '',
				errorCode : '',
				errorMessage : ''	
				
		};
	    	
		
		$scope.jobs = [];
 
    fetchAllJobs();
 
    function fetchAllJobs(){
        JobService.fetchAllJobs()
            .then(
            function(d) {
                self.jobs = d;
            },
            function(errResponse){
                console.error('Error while fetching Jobs');
            }
        );
    }
 
    function createJob(job){
        JobService.createJob(job)
            .then(
            fetchAllJobs,
            function(errResponse){
                console.error('Error while creating Jobs');
            }
        );
    }
 
    function jobApply(id){
    	$scope.appliedJob.job_id = id;
		console.log('Applying Job '+$scope.appliedJob.job_id)
		$scope.applyJob($scope.appliedJob)
		JobService.jobApplication(id).then(function(d) {
			$scope.fetchuserApplied($rootScope.currentUser.id)

			//$scope.show(appliedJob.job.id)
			
		}, function(errResponse) {
			console.error('Error while Applying Job.');
		});
    }
    
    
    
    
    
    
    function updateJob(job, id){
        JobService.updateJob(job, id)
            .then(
            fetchAllJobs,
            function(errResponse){
                console.error('Error while updating Job');
            }
        );
    }
 
    function deleteJob(id){
        JobService.deleteJob(id)
            .then(
            fetchAllJobs,
            function(errResponse){
                console.error('Error while deleting Job');
            }
        );
    }
 
    function submit() {
        if(self.job.id===null){
            console.log('Saving New Job', self.job);
            createJob(self.job);
        }else{
        	updateJob(self.job, self.job.id);
            console.log('Job updated with id ', self.job.id);
        }
        reset();
    }
 
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.jobs.length; i++){
            if(self.jobs[i].id === id) {
                self.job = angular.copy(self.jobs[i]);
                break;
            }
        }
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.job.id === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteJob(id);
    }
 
 
    function reset(){
        self.job={id:null,title:'',qualification:'',description:'',dateTime:''};
        $scope.myForm.$setPristine(); //reset Form
    }
 
}]);*/