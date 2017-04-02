var app = angular.module('loanApp', ['chart.js']);

app.controller('infoCtrl', function($scope) {
    $scope.isWorking= "Yes";
});

app.controller('loanOptions', function($scope, loanService) {
    $scope.loanOptions = [];

    $scope.getLoanOptions = function() {
        loanService.getLoanOptions().then(function(res) {
            $scope.loanOptions = res.data;
        }, function(res) {
            $scope.loanOptions = [{name: 'Oops! Something went wrong with the server!', interest: 500}]
        });
    };
    $scope.getLoanOptions();
});

app.controller('loanForm', function($scope, $rootScope) {
    var roundToTwo = function(num) {
        var rounded = +(Math.round(num + "e+2")  + "e-2");

        if (isNaN(rounded)) {
            return 0;
        } else {
            return rounded;
        }
    };

    $scope.submit = function(loan) {
        var monthlyInterest = loan.interest / 12;

        var monthlyPayment = calcMonthlyPayment(loan.amount, monthlyInterest, loan.period);
        var amountPaid = calcAmountPaid(monthlyPayment, loan.period);
        var chartData = calcChartData(loan.amount, monthlyInterest, loan.period, monthlyPayment);

        console.log(monthlyPayment, amountPaid);
        console.log(chartData);

        $rootScope.$broadcast('NEW_DATA', chartData);
        $rootScope.$broadcast('NEW_DATA_DETAILS', {months: loan.period, loanAmount: loan.amount, monthlyPayment: roundToTwo(monthlyPayment), totalPaid: roundToTwo(amountPaid)});
        $rootScope.$broadcast('NEW_SEARCH', {amount: loan.amount, interest: loan.interest, period: loan.period});


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
        var totalPrincipalPaid = 0;

        var interestPaid = 0;
        var totalInterestPaid = 0;

        var principalRemaining = amount;

        var totalPaid = 0;

        for (var i = 0; i < period; i++) {
            totalPaid = totalPaid + monthlyPayment;

            var month = 'Month ' + i;

            principalPaid = monthlyPayment - (principalRemaining * monthlyInterest);
            totalPrincipalPaid += principalPaid;

            interestPaid = monthlyPayment - principalPaid;
            totalInterestPaid += interestPaid;

            principalRemaining -= principalPaid;

            totalPayments.push({totalPaid: roundToTwo(totalPaid), month: month, principalPaid: roundToTwo(totalPrincipalPaid), interestPaid: roundToTwo(totalInterestPaid), principalRemaining: roundToTwo(principalRemaining)});
        }

        return totalPayments;
    }
});

app.controller('loanComputed', function ($scope, $rootScope) {
    $scope.months = 0;
    $scope.loanAmount = 0;
    $scope.monthlyPayment = 0;
    $scope.totalPaid = 0;

    $rootScope.$on('NEW_DATA_DETAILS', function(event, data) {
        $scope.months = data.months;
        $scope.loanAmount = data.loanAmount;
        $scope.monthlyPayment = data.monthlyPayment;
        $scope.totalPaid = data.totalPaid;
    });
});

app.controller('loanRecent', function($scope, $rootScope) {
    $scope.recentSearches = [];

    $rootScope.$on('NEW_SEARCH', function(event, loan) {
        $scope.recentSearches.unshift({amount: loan.amount, interest: loan.interest, period: loan.period})
    });

    $scope.clear = function() {
        $scope.recentSearches = [];
    }
});

app.controller('loanChart', function($scope, $rootScope) {
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Total Interest Paid', 'Total Principal Paid', 'Total Paid', 'Principal Remaining'];
    $scope.data = [];

    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    $rootScope.$on('NEW_DATA', function(event, data) {
        console.log(data);

        var labels = [];

        var interestPaid = [];
        var principalPaid = [];
        var totalPaid = [];

        var principalRemaining = [];

        for (var i = 0; i < data.length; i++) {
            labels.push(data[i].month);

            interestPaid.push(data[i].interestPaid);
            principalPaid.push(data[i].principalPaid);
            totalPaid.push(data[i].totalPaid);
            principalRemaining.push(data[i].principalRemaining);
        }

        $scope.labels = labels;
        $scope.data = [interestPaid, principalPaid, totalPaid, principalRemaining];
    });
});

app.service('loanService', function($http) {
    var getLoanOptions = function() {
        return $http({
            method: 'GET',
            url: '/api/directloaninfo'
        })
    };

    return {
        getLoanOptions: getLoanOptions
    }
});
