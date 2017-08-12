/*'use strict';
 
angular.module('myApp').controller('UserController', ['$scope', 'UserService','$rootScope',
	
	  function($scope, UserService,$rootScope) {
    var self = this;
    self.user={id:'',password:''};
    self.users=[];
 
    self.login = login;
    self.reset = reset;
    
    function validateUser(user){
     UserService.validateUser(user);
   }
    function login() {
    	
        console.log('Saving New User', self.user);
        validateUser(self.user);
        //$rootScope.currentUser(self.user.id);
		
     }
     function reset(){
        self.user={id:'',password:''};
        $scope.from.$setPristine(); //reset Form
    }
}]);*/

 
'use strict';

myApp
		.controller(
				'UserController',
				[
						'$scope',
						'UserService',
						'$location',
						'$rootScope',
						'$cookieStore',
						'$window',
						'$http',
						
						function($scope, UserService, $location, $rootScope,$cookieStore,
								$window, $http) {
							console.log("UserController...")
						// var this = this;
							$scope.user = {
								id : '',
								name : '',
								password : '',
								mobile : '',
								address : '',
								email : '',
								isOnline : '',
								dob : '',
								role : '',
								errorCode : '',
								errorMessage : '',
								imageUrl : ''
							};
							

							this.currentUser = {
								id : '',
								name : '',
								password : '',
								mobile : '',
								address : '',
								email : '',
								isOnline : '',
								dob :'',
								role : '',
								errorCode : '',
								errorMessage : '',
								imageUrl : ''
							};
							/*this.user = {
									id : '',
									name : '',
									password : '',
									mobile : '',
									address : '',
									email : '',
									isOnline : '',
									dob :'',
									role : '',
									errorCode : '',
									errorMessage : '',
									imageUrl : ''
								};*/
							
							$scope.users = []; // json array

							$scope.orderByMe = function(x) {
								$scope.myOrderBy = x;
							}

							$scope.getAllUsers =function()
							{
							
								
								
								console.log("fetchAllUsers...")
								UserService
										.fetchAllUsers()
										.then(
												function(d) {
													$scope.users = d;
												},
												function(errResponse) {
													console
															.error('Error while fetching Users');
												}).finally(function() {
											        cfpLoadingBar.complete();
											      });
								
								
								
							};
							$scope.getAllUser = function(){
	                            	console.log('Listing users started');
	                            	$scope.getAllUsers();
	                            }
							
							$scope.fetchAllUsers = function() {
								console.log("fetchAllUsers...")
								UserService
										.fetchAllUsers()
										.then(
												function(d) {
													$scope.users = d;
												},
												function(errResponse) {
													console
															.error('Error while fetching Users');
												});
							};

							// this.fatchAllUsers();

							this.createUser = function(user) {
								console.log("createUser...")
								UserService
										.createUser(user)
										.then(
												function(d) {
													$rootScope.status = "true";
													alert($rootScope.status)
													alert("Thank you for registration")
													$location.path("/home")
												},
												function(errResponse) {
													console
															.error('Error while creating User.');
												});
							};

							this.myProfile = function() {
								console.log("myProfile...")
								UserService
										.myProfile()
										.then(
												function(d) {
													this.user = d;
													$location
															.path("/myProfile")
												},
												function(errResponse) {
													console
															.error('Error while fetch profile.');
												});
							};

							this.accept = function(id) {
								console.log("accept...")
								UserService
										.accept(id)
										.then(
												function(d) {
													this.user = d;
													this.fetchAllUsers
													$location
															.path("/manage_users")
													alert(this.user.errorMessage)

												},

												function(errResponse) {
													console
															.error('Error while updating User.');
												});
							};

							this.reject = function(id) {
								console.log("reject...")
								var reason = prompt("Please enter the reason");
								UserService.reject(id, reason).then(
										function(d) {
											this.user = d;
											this.fetchAllUsers
											$location.path("/manage_users")
											alert(this.user.errorMessage)

										}, null);
							};

							this.updateUser = function(currentUser) {
								console.log("updateUser...")
								UserService.updateUser(currentUser).then(
										this.fetchAllUsers, null);
							};

							this.update = function() {
								{
									console.log('Update the user details',
											$rootScope.currentUser);
									this.updateUser($rootScope.currentUser);
								}
								this.reset();
							};
							// self.user = [];
							this.validateUser = function(user) {
								console.log("authenticate...")
								UserService
										.validateUser(user)
										.then(

												function(response) {
													
													$scope.user = response;
													console
															.log("user.errorCode: "
																	+ $scope.user.errorCode)
													if ($scope.user.errorCode == "404")

													{ 
														alert($scope.user.errorMessage)
                                                        console.log(JSON.stringify($scope.user))
														$scope.user.id = "";
														$scope.user.password = "";

													} else { // valid
																// credentials
														$rootScope.currentUser = response;
														$cookieStore.currentUser = response;
														console
																.log("Valid credentials. Navigating to home page")
                                                                $scope.fetchAllUsers();
														if($scope.user.role=="Admin")	
															{
															console.log("You are admin")
															// this.fetchAllUsers();
															}
														

														console
																.log('Current user : '
																		+ $scope.user)
														$rootScope.currentUser = $scope.user
														$cookieStore.put(
																'currentUser',
																$scope.user);

														$http.defaults.headers.common['Authorization'] = 'Basic '
																+ $rootScope.currentUser;
														$location
																.path('/home');

													}

												},
												function(errResponse) {

													console
															.error('Error while authenticate Users');
												});
							};

							$scope.logout = function() {
								console.log("logout")
								$rootScope.currentUser = {};
								$cookieStore.remove('currentUser');
								UserService.logout()
								$location.path('/');

							}
                            this.list_users = function(){
                            	console.log('Listing users started');
                            	this.fetchAllUsers();
                            }
							// this.fetchAllUsers(); //calling the method

							// better to call fetchAllUsers -> after login ???

							this.login = function() {
								{
									console.log('login validation????????',
											this.user);
									this.validateUser(this.user);
								}

							};

							this.submit = function() {
								{
									console.log('Saving New User', this.user);
									this.createUser(this.user);
								}
								this.reset();
							};

							this.reset = function() {
								this.user = {
									id : '',
									name : '',
									password : '',
									mobile : '',
									address : '',
									email : '',
									isOnline : '',
									errorCode : '',
									errorMessage : ''
								};
								$scope.myForm.$setPristine(); // reset Form
							};

						} ]);
