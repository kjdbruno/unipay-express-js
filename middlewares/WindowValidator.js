const { 
    body, validationResult
} = require('../utils/dependencies');

exports.ValidateForm = [
    body("Name")
        .trim()
        .notEmpty().withMessage("name is required"),
    body("Description")
        .trim()
        .notEmpty().withMessage("description is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
