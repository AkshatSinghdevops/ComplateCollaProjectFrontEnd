'use strict'
angular.module('myApp').controller('BlogController', ['$scope','BlogService','$rootScope','$http', function($scope,BlogService,$http,$rootScope) {
   
	
	
	this.currentBlog = {
			id : '',
			title : '',
			reason : '',
			description : '',
			date_time : '',
			status : '',
			user_id : ''
		};
	
	var self = this;
    self.blog={id:null,user_id:'',blog_name:'',description:''};
    self.blogs=[];
    $scope.userblog=[];
    
    $scope.blog = {};
	
	$scope.blogs = [];
    
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
 
 
   fetchAllBlogs();
   //getUserBlog();
    
 /* =========================================================================================================== */  
    
    	
    	/*$scope.selectUploadFile;
    	
    	$scope.uploadFile=function(){
    		
    		var formData = new FromData();
    		for(e in $scope.selectUploadFile){
    			fromData.append(e,$scope.selectUploadFile[e])
    		}
    		
    		var file = $('#file')[0].files[0];
    		console.log(file)
    		formData.append('file',$scope.selectUploadFile);
    		$http.post('api/uploa',formData,{
    			transformRequest:angular.indentity,
    			headers:{'Content-Type':multipart/from-data}
    		}).success(function(){
    			console.log('success upload file',file);
    		});
    		
    	};*/
    	
    	
    
    	
  

	
    	
	
	 /* ================================================================================================================== */  	
 
    function fetchAllBlogs(){
        BlogService.fetchAllBlogs()
            .then(
            function(d) {
                self.blogs = d;
            },
            function(errResponse){
                console.error('Error while fetching Blogs');
            }
        );
    }
    
    function getUserBlog(){
    	console.log("enter getUserBlog in controller")
        BlogService.getUserBlog()
            .then(fetchAllBlogs(),
            function(d) {
                $scope.userblog = d;
            },
            function(errResponse){
                console.error('Error while fetching Blogs');
            }
        );
    }
 
    function createBlog(blog){
        BlogService.createBlog(blog)
            .then(
            fetchAllBlogs,
            function(errResponse){
                console.error('Error while creating Blog in controller error');
            }
        );
    }
 
    function updateBlog(blog, id){
        BlogService.updateBlog(blog, id)
            .then(
            fetchAllBlogs,
            function(errResponse){
                console.error('Error while updating Blog');
            }
        );
    }
 
    function deleteBlog(id){
    	console.log('id from method', id);
        BlogService.deleteBlog(id)
            .then(
            fetchAllBlogs,
            function(errResponse){
                console.error('Error while deleting Blog');
            }
        );
    }
 
    function submit() {
        if(self.blog.id===null){
            console.log('Saving New Blog', self.blog);
            createBlog(self.blog);
        }else{
            updateBlog(self.blog, self.blog.id);
            console.log('Blog updated with id ', self.blog.id);
        }
        reset();
    }
 
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.blogs.length; i++){
            if(self.blogs[i].id === id) {
                self.blog = angular.copy(self.blogs[i]);
                break;
            }
        }
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.blog.id === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteBlog(id);
    }
 
 
    function reset(){
        self.blog={id:null,user_id:'',blog_name:'',description:''};
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
    
    
    $scope.blogAccepts = function(blog) {
		blog.status = 'Y';
		BlogService.updateBlog(blog).then(function(d) {

			//$location.path("/list")
		}, function(errResponse) {
			console.error('Error while Updating Blog.');
		});

	};

	$scope.blogAccept = function(blog) {
		{
			console.log('Accepting Blog' + blog.blog_name);
			$scope.blogAccepts(blog);
		}

	};
	
	$scope.blogRejects = function(blog) {
		blog.status = 'N';
		BlogService.updateBlog(blog).then(function(d) {

			//$location.path("/blog-manage")
		}, function(errResponse) {
			console.error('Error while Updating Blog.');
		});

	};
	
	$scope.blogReject = function(blog) {
		{
			console.log('Rejecting Blog' + blog.blog_name);
			$scope.blogRejects(blog);
		}

	};
    
 
}]);