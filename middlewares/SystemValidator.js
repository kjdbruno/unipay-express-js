const { 
    body, validationResult
} = require('../utils/dependencies');

exports.ValidateForm = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required"),
    body("code")
        .trim()
        .notEmpty().withMessage("Code is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
