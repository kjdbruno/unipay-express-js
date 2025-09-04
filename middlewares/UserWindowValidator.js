const { 
    body, validationResult
} = require('../utils/dependencies');

exports.ValidateForm = [
    body("UserId")
        .trim()
        .notEmpty().withMessage("user is required"),
    body("WindowId")
        .trim()
        .notEmpty().withMessage("window is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
