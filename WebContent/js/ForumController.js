'use strict';
 
angular.module('myApp').controller('ForumController', ['$scope', 'ForumService', function($scope, ForumService) {
    var self = this;
    self.chatforum={id:null,user_id:'',message:'',create_date:''};
    self.chatforums=[];
 
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
 
 
    fetchAllChatForums();
 
    function fetchAllChatForums(){
        ForumService.fetchAllChatForums()
            .then(
            function(d) {
                self.chatforums = d;
            },
            function(errResponse){
                console.error('Error while fetching ChatForums');
            }
        );
    }
 
    function createChatForum(chatforum){
        ForumService.createChatForum(chatforum)
            .then(
            fetchAllChatForums,
            function(errResponse){
                console.error('Error while creating ChatForum');
            }
        );
    }
   
    
    function singleForum(chatforum, id){
        ForumService.singleForum(chatforum, id)
             .then(
             fetchAllChatForums,
             function(errResponse){
                 console.error('Error while updating ChatForum');
             }
         );
     }
    
    
    function updateChatForum(chatforum, id){
       ForumService.updateChatForum(chatforum, id)
            .then(
            fetchAllChatForums,
            function(errResponse){
                console.error('Error while updating ChatForum');
            }
        );
    }
 
    function deleteChatForum(id){
        ForumService.deleteChatForum(id)
            .then(
            fetchAllChatForums,
            function(errResponse){
                console.error('Error while deleting ChatForum');
            }
        );
    }
 
    function submit() {
        if(self.chatforum.id==null){
            console.log('Saving New ChatForum', self.chatforum);
            createChatForum(self.chatforum);
        }else{
            updateChatForum(self.chatforum, self.chatforum.id);
            console.log('ChatForum updated with id ', self.chatforum.id);
        }
        reset();
    }
 
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.chatforums.length; i++){
            if(self.chatforums[i].id === id) {
                self.chatforum = angular.copy(self.chatforums[i]);
                break;
            }
        }
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.chatforum.id === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteChatForum(id);
    }
 
 
    function reset(){
        self.chatforum={id:null,user_id:'',message:'',create_date:''};
        $scope.myForm.$setPristine(); //reset Form
    }
 
}]);