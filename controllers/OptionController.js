const { 
    Op, 
    Sequelize
} = require('../utils/dependencies');

const { 
    Role,
    Office,
    Account,
    Fund,
    System
} = require('../models');

exports.GetRole = async (req, res) => {

    try {

        const roles = await Role.findAll({
            attributes: [
                ['id', 'value'],
                ['name', 'label']
            ]
        });

        res.json(roles);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.GetOffice = async (req, res) => {

    try {

        const offices = await Office.findAll({
            attributes: [
                ['id', 'value'],
                ['name', 'label']
            ]
        });

        res.json(offices);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.GetAccount = async (req, res) => {

    try {

        const accounts = await Account.findAll({
            where: {
                IsActive: true
            },
            attributes: [
                ['Id', 'value'],
                [Sequelize.literal("CONCAT(Code, ' - ', Title)"), 'label']
            ]
        });

        res.json(accounts);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.GetFund = async (req, res) => {

    try {

        const funds = await Fund.findAll({
            where: {
                isActive: true
            },
            attributes: [
                ['id', 'value'],
                ['name', 'label']
            ]
        });

        res.json(funds);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.GetSystem = async (req, res) => {

    try {

        const systems = await System.findAll({
            where: {
                isActive: true
            },
            attributes: [
                ['id', 'value'],
                [Sequelize.literal("CONCAT(code, ' - ', name)"), 'label']
            ]
        });

        res.json(systems);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};
