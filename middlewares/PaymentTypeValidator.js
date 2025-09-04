const { 
    body, validationResult
} = require('../utils/dependencies');

exports.ValidateForm = [
    body("name")
        .trim()
        .notEmpty().withMessage("name is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
