
app.controller('loginController', function ($scope, loginAuthService, $state, $rootScope, $http, api, $interval) {

    $rootScope.menuShow = false;
    $rootScope.error = false;
    $interval(intCheck, 120000);

    $scope.validate = function () {
        var url = api.apiUrl+"/api/loginAuth/"+$scope.username;
        if ( $scope.username  && $scope.password ) 
        {
       
        $http.get(url).then( function (response) {
            $scope.loginData = response.data;
            if ( $scope.loginData != "User Id not exist please sign up and continue") {
                if ( $scope.username == $scope.loginData.username && $scope.password == $scope.loginData.password) 
                {
                    $rootScope.menuShow = true;
                    $rootScope.user = $scope.username;
                    $state.go('home');
                }       
                else 
                {
                    $rootScope.error = true;
                    $rootScope.errMsg = "Incorrect username or Password"
                }      
            }
            else 
            {
                $rootScope.error = true;
                $rootScope.errMsg = "No User Found"
            }

        }).catch(function(response){
            console.error("Unable to connect  service");
        });
    }
    else{
        $rootScope.error = true;
        $rootScope.errMsg = "Both fields are required"
    } 
        

    };
});