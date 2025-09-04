const { 
    body, 
    validationResult
} = require('../utils/dependencies');

exports.ValidateForm = [
    body("Name")
        .trim()
        .notEmpty().withMessage("name is required"),
    body("ServiceId")
        .trim()
        .notEmpty().withMessage("revenue service is required"),
    body("ReceiptId")
        .trim()
        .notEmpty().withMessage("receipt is required"),
    body("Cost")
        .optional({ 
            checkFalsy: true 
        })
        .isDecimal({ 
            decimal_digits: '0,2' 
        }).withMessage("cost must be a decimal value"),
    body("IsManual")
        .trim()
        .notEmpty().withMessage("manual is required"),
    body("IsOnline")
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
