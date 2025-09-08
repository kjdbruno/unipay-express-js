const { 
    body, 
    validationResult
} = require('../utils/dependencies');

exports.ValidateForm = [
    body("name")
        .trim()
        .notEmpty().withMessage("name is required"),
    body("serviceId")
        .trim()
        .notEmpty().withMessage("revenue service is required"),
    body("receiptId")
        .trim()
        .notEmpty().withMessage("receipt is required"),
    body("cost")
        .optional({ 
            checkFalsy: true 
        })
        .isDecimal({ 
            decimal_digits: '0,2' 
        }).withMessage("cost must be a decimal value"),
    body("isManual")
        .trim()
        .notEmpty().withMessage("manual is required"),
    body("isOnline")
        .trim()
        .notEmpty().withMessage("online is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
