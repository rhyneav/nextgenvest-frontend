const express = require('express');
const router = express.Router();

const { scrapePage } = require('../scrape');

module.exports = router;

router.get('/directloaninfo', (req, res) => {
    var loanOptions =  [
        {
            name: 'A private bank loan',
            interest: 4.2
        },
        {
            name: 'A loan from the university',
            interest: 4
        }
    ];

    scrapePage.then((data) => {
        loanOptions.push({
                name: 'Direct Subsidized Loan',
                interest: data.dsl
            },
            {
                name: 'Direct Unsubsidized Loan',
                interest: data.dul
            });

        res.send(loanOptions);
    });

});