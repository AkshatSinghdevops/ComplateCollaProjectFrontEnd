/*'use strict'
angular.module('myApp').controller('CommentBlog', ['$scope', 'CommentService', function($scope, CommentService) {
    var self = this;
    self.blogcomment={id:null,blog_id:'',user_id:'',blog_comment:''};
    self.blogcomments=[];
 
    self.create = create;
    self.remove = remove;
    
    function createComment(blogcomment){
    	
    	CommentService.createComment(blogcomment)
    	.then (
    	        function(response)
    	        {
    	        	 console.log("success create comment")
    	        },
    	        function(errResponse){
                    console.error('Error while creating Blog');
                }
    	);
    }
        
    
    function create() {
        if(self.blogcomment.id===null){
            console.log('Saving New Blog', self.blogcomment);
            createComment(self.blogcomment);
        }else{
           
            console.log('Blog updated with id ', self.blog.id);
        }
        reset();
    }


}]);*/