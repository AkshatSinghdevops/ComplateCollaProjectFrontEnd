'use strict';
 
angular.module('myApp').controller('MessageForumController', ['$scope','$routeParams','$rootScope', 'MessageForumService', function($scope,$rootScope, $routeParams,MessageForumService) {
    var self = this;
    self.messageforum={id:null,forum_comment:'',forum_id:'',user_id:''};
    self.messageforums=[];
    $rootScope.chatforum={id:null,user_id:'',message:'',create_date:''};
    $scope.chatforum={id:null,user_id:'',message:'',create_date:''};
    $rootScope.chatforum=[];
    
    self.submit = submit;
    self.remove = remove;
    self.reset = reset;
 
     // var id = $routeParams.id;
    fetchAllMessageForums();
    
 
    function fetchAllMessageForums(id){
    	
    	console.log("fetchallMessageForum");
        MessageForumService.fetchAllMessageForums(id)
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
    	console.log("single forum method " + id)
        MessageForumService.singleForum(id)
             .then(
             console.log("success"),
             function(errResponse){
                 console.error('Error while updating ChatForum');
             }
         );
     }
 
    function createMessageForum(messageforum){
        MessageForumService.createMessageForum(messageforum)
            .then(
            fetchAllMessageForums,
            function(errResponse){
                console.error('Error while creating MessageForum');
            }
        );
    }
 
   
 
    function deleteMessageForum(id){
        MessageForumService.deleteMessageForum(id)
            .then(
            fetchAllMessageForums,
            function(errResponse){
                console.error('Error while deleting MessageForum');
            }
        );
    }
 
    function submit() {
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
 
}]);