var app = angular.module('loanApp', []);

app.controller('infoCtrl', function($scope) {
    $scope.isWorking= "Yes";
});

app.controller('loanOptions', function($scope, loanService) {
    $scope.loanOptions = [];

    $scope.getLoanOptions = function() {
        loanService.getLoanOptions().then(function (res) {
            $scope.loanOptions = res;
        });
    };
    $scope.getLoanOptions();
});

app.controller('loanForm', function($scope) {
    $scope.submit = function(loan) {
        console.log(loan);
    }
});

app.service('loanService', function($timeout) {
    var loanOptions =  [
        {
            name: 'Direct Subsidized Loan',
            interest: 1
        },
        {
            name: 'Direct Unsubsidized Loan',
            interest: 2
        },
        {
            name: 'A private bank loan',
            interest: 3
        },
        {
            name: 'A loan from the university',
            interest: 4
        },
    ];

    var getLoanOptions = function() {
        return $timeout(function() {
            return loanOptions
        }, 1000);
    };

    return {
        getLoanOptions: getLoanOptions
    }
});
