const express = require('express');
const router = express.Router();

const { 
    GetRole,
    GetOffice,
    GetAccount,
    GetFund,
    GetSystem
} = require('../controllers/OptionController');

router.get('/role', GetRole);
router.get('/office', GetOffice);
router.get('/account', GetAccount);
router.get('/fund', GetFund);
router.get('/system', GetSystem);

module.exports = router;