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
        var monthlyInterest = loan.interest / 12;

        var monthlyPayment = calcMonthlyPayment(loan.amount, monthlyInterest, loan.period);
        var amountPaid = calcAmountPaid(monthlyPayment, loan.period);
        var chartData = calcChartData(loan.amount, monthlyInterest, loan.period, monthlyPayment);

        console.log(monthlyPayment, amountPaid);
        console.log(chartData);
    };

    var calcMonthlyPayment = function(amount, monthlyInterest, period) {
        // FORMULA M = P * (J / (1 - (1 + J)^-N))
        // M = payment amount
        // P = principal (amount borrowed)
        // J = interest rate
        // N = number of payments (time)

        var monthlyPayment = amount * (monthlyInterest / (1 - (Math.pow(1 + monthlyInterest, (-1 * period)))));
        return monthlyPayment;
    };

    var calcAmountPaid = function(monthlyPayment, period) {
        return monthlyPayment * period;
    };

    var calcChartData = function(amount, monthlyInterest, period, monthlyPayment) {
        var totalPayments = [];

        var principalPaid = 0;

        var interestPaid = 0;

        var principalRemaining = amount;

        var totalPaid = 0;

        for (var i = 0; i < period; i++) {
            totalPaid = totalPaid + monthlyPayment;

            var month = 'Month ' + i;

            principalPaid = monthlyPayment - (principalRemaining * monthlyInterest);

            interestPaid = monthlyPayment - principalPaid;

            principalRemaining -= principalPaid;

            totalPayments.push({totalPaid: totalPaid, month: month, principalPaid: principalPaid, interestPaid: interestPaid, principalRemaining: principalRemaining});
        }

        return totalPayments;
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
