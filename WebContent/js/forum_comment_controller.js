'use strict';
myApp.controller('MessageForumController', [
	'$scope',
	'MessageForumService',
	'$location',
	'$rootScope',
	'$cookieStore',
	'$window',
	'$http',
	'$routeParams',
	function($scope, MessageForumService, $location, $rootScope, $cookieStore,
			$window, $http, $routeParams) {
		$scope.$routeParams = $routeParams;

		console.log("UserController..." + $scope.$routeParams.param)
       var param = $scope.$routeParams.param;
		
		
		
		$scope.message = {};
		this.messageforum={id:null,forum_comment:'',forum_id:'',user_id:''};
		 $scope.messageforums=[];
		
		 
		 

		

		$scope.getSingleBlog = function(id) {

			console.log("Get blog..." + id)
			MessageForumService.fetchAllMessageForums(id).then(function(d) {
				$scope.messageforum = d;

			}, function(errResponse) {
				console.error('Error while fetching Blogs');
			});

		};

		$scope.single_blog = function() {
			{
				//console.log('Getting single blog with id' + param);
				$scope.getSingleBlog(param);
			}

		};
		
//===========================================================================================================================================		
		
		$scope.createMessage = function(messageforum,id) {
		
			
			console.log("create messageforum STarted...")
			MessageForumService.createMessageForum(messageforum,id).then(function(d) {

				alert("Message Added Successfully")
				//$location.path("/myBlog")
			}, function(errResponse) {
				console.error('Error while creating messageforum.');
			});
		};

		$scope.create = function() {
			{
				console.log('Saving New message forum ');
			
				$scope.createMessage($scope.messageforum,param);
			}

		};
	} ]);


/*angular.module('myApp').controller('MessageForumController', ['$scope','$routeParams','$route','$rootScope','MessageForumService', function($scope,$rootScope,$route,$routeParams,MessageForumService) {
    var self = this;
    $rootScope.chatforum={id:'',user_id:'',message:'',create_date:''};
    $scope.chatforum={id:'',user_id:'',message:'',create_date:''};
    self.messageforum={id:null,forum_comment:'',forum_id:'',user_id:''};
    self.messageforums=[];
    $scope.messageforums = [];
    
    self.submit = submit;
    self.remove = remove;
    self.reset = reset;
 
    
    var param = $routeParams.param;
   
   fetchAllMessageForums();
    

     
		
 
    function fetchAllMessageForums(){
    	console.log(" param si  "    + param) 
 MessageForumService.fetchAllMessageForums(param)
            .then(
            function(d) {
                self.messageforums = d;
            },
            function(errResponse){
                console.error('Error while fetching MessageForums');
            }
        );
    }
    
  
    
    function singleForum(id){
    	
    	console.log("single forum method " + id );
        MessageForumService.singleForum(id)
             .then(
            		 function(d) {
                         self.messageforums = d;
             console.log("success")},
             function(errResponse){
                 console.error('Error while updating ChatForum');
             }
         );
     }
    
    function singleForumID(param){
    	
    	singleForum(param);
    }
    
 
    function createMessageForum(messageforum){
    	console.log("function createMessageForum(messageforum,id)"  )
        MessageForumService.createMessageForum(messageforum)
            .then(
           // fetchAllMessageForums,
            function(errResponse){
                console.error('Error while creating MessageForum');
            }
        );
    }
 
   
 
    function deleteMessageForum(id){
        MessageForumService.deleteMessageForum(id)
            .then(
           // fetchAllMessageForums,
            function(errResponse){
                console.error('Error while deleting MessageForum');
            }
        );
    }
 
    function submit() {
    	
    	console.log("id is  " )
        if(self.messageforum.id==null){
            console.log('Saving New MessageForum', self.messageforum);
            createMessageForum(self.messageforum);
        }else{
            updateMessageForum(self.messageforum, self.messageforum.id);
            console.log('MessageForum updated with id ', self.messageforum.id);
        }
        reset();
    }
 
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.messageforum.id === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteMessageForum(id);
    }
 
 
    function reset(){
        self.messageforum={id:null,forum_comment:''};
        $scope.myForm.$setPristine(); //reset Form
    }
    
    $scope.getSingleBlog = function(id) {

		console.log("Get blog..." + id)
		BlogService.singleUserBlog(id).then(function(d) {
			$rootScope.currentBlog = d;

		}, function(errResponse) {
			console.error('Error while fetching Blogs');
		});

	};

	$scope.single_blog = function(id) {
		{
			console.log('Getting single blog with id' + id);
			$scope.getSingleBlog(id);
		}

	};
 
}]);*/