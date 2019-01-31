app.controller('registerController',function ($scope, loginAuthService, $state, $rootScope, $http, api, $interval) {
//    $scope.regForm = {
//     RegName :"",
//     ReguserId :"",
//     Regpassword :"",
//     Regemail :"",
//     RegphoneNumbr :"",
//    }
$scope.register = function  () {
        var url = api.apiUrl+"/api/register";
        var data = {
            RegName:$scope.RegName,
        ReguserId :$scope.ReguserId,
    Regpassword :$scope.Regpassword,
    Regemail :$scope.Regemail,
    RegphoneNumbr :$scope.RegphoneNumbr,
        }
        $http.post(url,data).then( function (response){
            res = response.data;
            
            if( res == "Registration Successfull" ){
                window.alert(res);
                $state.go('login');
            }
            else
            {
                window.alert(res);
                
            }
        }).catch(function(response){
            console.error("Unable to connect service");
        });
    }
});