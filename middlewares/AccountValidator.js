const { 
    body, 
    validationResult
} = require('../utils/dependencies');

exports.ValidateForm = [
    body("code")
        .trim()
        .notEmpty().withMessage("code is required"),
    body("title")
        .trim()
        .notEmpty().withMessage("title is required"),
    body("description")
        .trim()
        .notEmpty().withMessage("description is required"),
    body("balance")
        .trim()
        .notEmpty().withMessage("balance is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
