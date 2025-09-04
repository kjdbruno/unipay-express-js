const express = require('express');
const router = express.Router();

const { 
    GetAllMaritalStatuses,
    GetMaritalStatus,
    CreateMaritalStatus,
    UpdateMaritalStatus,
    DisableMaritalStatus,
    EnableMaritalStatus
} = require('../controllers/MaritalStatusController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/MaritalStatusValidator');

router.get('/', VerifyToken, GetAllMaritalStatuses);
router.get('/option', VerifyToken, GetMaritalStatus);
router.post('/', VerifyToken, ValidateForm, CreateMaritalStatus);
router.post('/:Id/update', VerifyToken, ValidateForm, UpdateMaritalStatus);
router.post('/:Id/disable', VerifyToken, DisableMaritalStatus);
router.post('/:Id/enable', VerifyToken, EnableMaritalStatus);

module.exports = router;