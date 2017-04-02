const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/directloaninfo', (req, res) => {
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
            interest: 4.2
        },
        {
            name: 'A loan from the university',
            interest: 4
        },
    ];

    res.send(loanOptions);
});