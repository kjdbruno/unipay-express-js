const express = require('express');
const router = express.Router();

const { 
    GetAllProfessions,
    GetProfession,
    CreateProfession,
    UpdateProfession,
    DisableProfession,
    EnableProfession
} = require('../controllers/ProfessionController');

const { 
    VerifyToken, 
} = require('../middlewares/AuthMiddleware');

const { 
    ValidateForm 
} = require('../middlewares/ProfessionValidator');

router.get('/', VerifyToken, GetAllProfessions);
router.get('/option', VerifyToken, GetProfession);
router.post('/', VerifyToken, ValidateForm, CreateProfession);
router.post('/:Id/update', VerifyToken, ValidateForm, UpdateProfession);
router.post('/:Id/disable', VerifyToken, DisableProfession);
router.post('/:Id/enable', VerifyToken, EnableProfession);

module.exports = router;