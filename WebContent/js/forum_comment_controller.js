'use strict';
 
angular.module('myApp').controller('MessageForumController', ['$scope', 'MessageForumService', function($scope, MessageForumService) {
    var self = this;
    self.messageforum={id:null,forum_comment:'',forum_id:'',user_id:''};
    self.messageforums=[];
 
    self.submit = submit;
    self.remove = remove;
    self.reset = reset;
 
 
    fetchAllMessageForums();
 
    function fetchAllMessageForums(forum_id){
    	
    	console.log("gggggggg",forum_id);
        MessageForumService.fetchAllMessageForums()
            .then(
            function(d) {
                self.messageforums = d;
            },
            function(errResponse){
                console.error('Error while fetching MessageForums');
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
 
    function submit(forum_id) {
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