
/*angular.module('myApp')
   
    .controller('ImageController',function($scope,$http,ImageController){
    	
    	$scope.selectUploadFile;
    	
    	$scope.uploadFile=function(){
    		
    		var formData = new fromData();
    		formData.append('file',$scope.selectUploadFile);
    		$http.post('api/uploa',formData,{
    			transformRequest:angular.identiry,
    			headers:{'Content-Type':undefined}
    		}).success(function(){
    			console.info('success upload file');
    		});
    		
    	};
    });*/


'use strict';



myApp.controller('FileUploadController', function($scope, $http) {

    $scope.document = {};

        $scope.setTitle = function(fileInput) {

        var file=fileInput.value;
        var filename = file.replace(/^.*[\\\/]/, '');
        var title = filename.substr(0, filename.lastIndexOf('.'));
        $("#title").val(title);
        $("#title").focus();
        $scope.document.title=title;
    };

        $scope.uploadFile=function(){
             var formData=new FormData();
         formData.append("file",file.files[0]);
                   $http({
                  method: 'POST',
                  url: 'http://localhost:8080/RestController/newDocument',
                  headers: { 'Content-Type': 'multipart/form-data'},
                  data:  formData
                })
                .success(function(data, status) {                       
                    alert("Success ... " + status);
                })
                .error(function(data, status) {
                    alert("Error ... " + status);
                });
      };
});