const { 
    Op, 
    Sequelize  
} = require('../utils/dependencies');

const { 
    Nationality 
} = require('../models');

exports.GetAllNationalities = async (req, res) => {

    const Page = parseInt(req.query.page) || 1;
    const Limit = parseInt(req.query.limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await Nationality.findAndCountAll({
            limit: Limit,
            offset: Offset,
            order: [['CreatedAt', 'DESC']]
        });

        res.json({
            Data: rows,
            Meta: {
                TotalItems: count,
                TotalPages: Math.ceil(count / Limit),
                CurrentPage: Page
            }
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.GetNationality = async (req, res) => {

    try {

        const nationalities = await Nationality.findAll({
            where: {
                IsActive: true
            },
            attributes: [
                ['Id', 'Value'],
                ['Name', 'Label']
            ]
        });

        res.json(nationalities);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.CreateNationality = async (req, res) => {

    const {
        Name
    } = req.body;

    try {

        const recordExist = await Nationality.findOne({
            where: { 
                Name
            }
        });

        if (recordExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record already exists!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        const nationality = await Nationality.create({
            Name
        });

        res.status(201).json({ 
            Message: "record created.", 
            Data: nationality 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }

};

exports.UpdateNationality = async (req, res) => {

    const {
        Id
    } = req.params;

    const {
        Name
    } = req.body;
  
    try {

        const nationality = await Nationality.findByPk(Id);

        if (!nationality) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        const recordExist = await Nationality.findOne({
            where: {
                Name,
                Id: { [Op.ne]: Id }
            },
        });

        if (recordExist) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record already exist!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        await nationality.update({
            Name
        });

        res.status(200).json({ 
            Message: "record modified.", 
            Data: nationality 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableNationality = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const nationality = await Nationality.findByPk(Id);

        if (!nationality) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        await nationality.update({
            IsActive: false
        });

        res.status(200).json({ 
            Message: "record disabled.", 
            Data: nationality 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.EnableNationality = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const nationality = await Nationality.findByPk(Id);

        if (!nationality) {
            return res.status(403).json({
                errors: [{
                    type: "manual",
                    value: "",
                    msg: "record not found!",
                    path: "name",
                    location: "body",
                }],
            });
        }

        await nationality.update({
            IsActive: true
        });

        res.status(200).json({ 
            Message: "record enabled.", 
            Data: nationality
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};