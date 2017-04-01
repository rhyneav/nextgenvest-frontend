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
        calcMonthlyPayment(loan.amount, loan.interest, loan.period)
    };

    var calcMonthlyPayment = function(amount, interest, period) {
        // FORMULA M = P * (J / (1 - (1 + J)^-N))
        // M = payment amount
        // P = principal (amount borrowed)
        // J = interest rate
        // N = number of payments (time)

        var monthlyInterest = interest / 12;

        var monthlyPayment = amount * (monthlyInterest / (1 - (Math.pow(1 + monthlyInterest, (-1 * period)))));
        console.log(monthlyPayment);
        return monthlyPayment;
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
