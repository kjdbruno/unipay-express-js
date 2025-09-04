const express = require('express');
const router = express.Router();

const { 
    GetAllOffices, 
    CreateOffice,
    UpdateOffice,
    DisableOffice,
    EnableOffice,
    GetOffice
} = require('../controllers/OfficeController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/OfficeValidator');

router.get('/', VerifyToken, GetAllOffices);
router.get('/option', VerifyToken, GetOffice);
router.post('/', VerifyToken, ValidateForm, CreateOffice);
router.post('/:id/update', VerifyToken, ValidateForm, UpdateOffice);
router.post('/:id/disable', VerifyToken, DisableOffice);
router.post('/:id/enable', VerifyToken, EnableOffice);

module.exports = router;