const express = require('express');
const router = express.Router();

const { 
    GetAllNationalities,
    GetNationality,
    CreateNationality,
    UpdateNationality,
    DisableNationality,
    EnableNationality
} = require('../controllers/NationalityController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/NationalityValidator');

router.get('/', VerifyToken, GetAllNationalities);
router.get('/option', VerifyToken, GetNationality);
router.post('/', VerifyToken, ValidateForm, CreateNationality);
router.post('/:Id/update', VerifyToken, ValidateForm, UpdateNationality);
router.post('/:Id/disable', VerifyToken, DisableNationality);
router.post('/:Id/enable', VerifyToken, EnableNationality);

module.exports = router;