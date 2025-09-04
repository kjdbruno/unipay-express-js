const express = require('express');
const router = express.Router();

const { 
    GetAll,
    Create,
    Update,
    Disable,
    Enable
} = require('../controllers/RevenueServiceController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/RevenueServiceValidator');

router.get('/', VerifyToken, GetAll);
router.post('/', VerifyToken, ValidateForm, Create);
router.post('/:Id/update', VerifyToken, ValidateForm, Update);
router.post('/:Id/disable', VerifyToken, Disable);
router.post('/:Id/enable', VerifyToken, Enable);

module.exports = router;