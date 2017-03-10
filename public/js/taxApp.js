//inject angular file upload directive.
var app = angular.module('fileUpload', ['ngFileUpload'], function($interpolateProvider){
	$interpolateProvider.startSymbol('[{');
	$interpolateProvider.endSymbol('}]');
});

app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
	
    $scope.uploadFiles = function(file, errFiles) {
    	$scope.tableData = null;
        $scope.errorMsg = null;
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                url: 'employee/paySlip',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    $scope.tableData = response.data;
                    console.log(response.data);
                });
            }, function (response) {                
                if (response.status > 0) {
                    //$scope.errorMsg = response.status + ': ' + response.data;
                    $scope.errorMsg = response.statusText;
                }
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        }   
    }
}]);
