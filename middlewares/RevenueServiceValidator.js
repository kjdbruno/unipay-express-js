const { 
    body, 
    validationResult
} = require('../utils/dependencies');

exports.ValidateForm = [
    body("name")
        .trim()
        .notEmpty().withMessage("name is required"),
    body("accountId")
        .trim()
        .notEmpty().withMessage("account is required"),
    body("officeId")
        .trim()
        .notEmpty().withMessage("office is required"),
    body("fundId")
        .trim()
        .notEmpty().withMessage("fund is required"),
    body("systemId")
        .trim()
        .notEmpty().withMessage("system is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
