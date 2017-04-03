const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");

const url = 'https://studentaid.ed.gov/sa/types/loans/interest-rates';
const DSL = 'Direct Subsidized Loans';
const DUL = 'Direct Unsubsidized Loans';

// Placeholders for if page format changes
var dslAmount = '9.76';
var dulAmount = '9.76';

var scrapePage = new Promise((resolve, reject) => {


    request(url, (error, response, html) => {
        if (error) throw error;

        var $ = cheerio.load(html);

        $('table td').each(function(i, element) {

            var text = $(this).text();

            if (text.includes(DSL)) {
                var nextDslValue = $(this).next();

                if (nextDslValue.text().includes('Undergraduate')) {
                    var dslLoanAmount = nextDslValue.next().text();

                    if (dslLoanAmount.includes('%')) {
                        dslAmount = convertToNumber(dslLoanAmount);
                    }

                }
            }

            if (text.includes(DUL)) {
                var nextDulValue = $(this).next();

                if(nextDulValue.text().includes('Undergraduate')) {
                    var dulLoanAmount = nextDulValue.next().text();

                    if (dulLoanAmount.includes('%')) {
                        dulAmount = convertToNumber(dulLoanAmount);
                    }
                }
            }
        });

        resolve({dsl: dslAmount, dul: dulAmount});
    });
});

var convertToNumber = function(value) {
    // remove whitespace
    var number = value.replace(/\s/g,'');

    // remove % sign
    number = value.replace('%', '');

    return +number;
};

module.exports = { scrapePage };