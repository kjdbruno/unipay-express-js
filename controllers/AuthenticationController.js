const { bcrypt, jwt } = require('../utils/dependencies');
const { 
    User
} = require('../models');

exports.Login = async (req, res) => {

    const {
        username,
        password
    } = req.body;

    try {
        
        const user = await User.findOne({
            where: { 
                username
            }
        });

        if (!user) {
            return res.status(404).json({
                errors: [
                    {
                        type: "field",
                        value: "",
                        msg: "record not found",
                        path: "username",
                        location: "body",
                    },
                ],
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                errors: [
                    {
                        type: "field",
                        value: "",
                        msg: "invalid credentials!",
                        path: "username",
                        location: "body",
                    },
                ],
            });
        }

        const token = jwt.sign({
            id: user.id 
        }, process.env.JWT_SECRET, {
            expiresIn: "8h" 
        });
        
        res.json({ 
            user, 
            token 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }
};