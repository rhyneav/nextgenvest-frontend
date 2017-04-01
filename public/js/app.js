var app = angular.module('loanApp', []);

app.controller('infoCtrl', function($scope) {
    $scope.isWorking= "Yes";
});

app.controller('loanForm', function($scope) {
    $scope.submit = function(loan) {
        console.log(loan);
    }
});