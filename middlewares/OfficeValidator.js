const { 
    body, validationResult
} = require('../utils/dependencies');

exports.ValidateForm = [
    body("name")
        .trim()
        .notEmpty().withMessage("name is required"),
    body("alias")
        .trim()
        .notEmpty().withMessage("alias is required"),
    body("email")
        .trim()
        .notEmpty().withMessage("email is required")
        .isEmail().withMessage("Invalid email address"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
