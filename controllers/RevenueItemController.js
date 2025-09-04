const { 
    Op, 
    Sequelize
} = require('../utils/dependencies');

const { 
    RevenueItem,
    RevenueService,
    Receipt,
    Account,
    Fund,
    Office,
    System
} = require('../models');

exports.GetAllRevenueItems = async (req, res) => {

    const Page = parseInt(req.query.page) || 1;
    const Limit = parseInt(req.query.limit) || 10;
    const Offset = (Page - 1) * Limit;

    try {

        const { count, rows } = await RevenueItem.findAndCountAll({
            include: [
                {
                    model: RevenueService,
                    as: 'RevenueService',
                    attributes: ['Name'],
                    include: [
                        {
                            model: Account,
                            as: 'Account',
                            attributes: ['Code', 'Title']
                        },
                        {
                            model: Fund,
                            as: 'Fund',
                            attributes: ['Name']
                        },
                        {
                            model: Office,
                            as: 'Office',
                            attributes: ['Name']
                        },
                        {
                            model: System,
                            as: 'System',
                            attributes: ['Name']
                        }
                    ],
                },
                {
                    model: Receipt,
                    as: 'Receipt',
                    attributes: ['Name']
                }
            ],
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

exports.GetRevenueItem = async (req, res) => {

    try {

        const items = await RevenueItem.findAll({
            where: {
                IsActive: true
            },
            include: [
                {
                    model: RevenueService,
                    as: 'RevenueService',
                    attributes: ['Name'],
                    include: [
                        {
                            model: Fund,
                            as: 'Fund',
                            attributes: ['Name']
                        },
                        {
                            model: Office,
                            as: 'Office',
                            attributes: ['Name']
                        }
                    ],
                },
                {
                    model: Receipt,
                    as: 'Receipt',
                    attributes: ['Name']
                }
            ],
            attributes: [
                ['Id', 'Value'],
                [Sequelize.literal("CONCAT(`RevenueService->Office`.`Alias`, ' - ', `RevenueItem`.`Name`)"), 'Label'],
                ['Cost', 'Cost']
            ]
        });

        res.json(items);

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.CreateRevenueItem = async (req, res) => {

    const {
        Name,
        ServiceId,
        ReceiptId,
        Cost,
        IsManual,
        IsOnline
    } = req.body;

    try {

        const recordExist = await RevenueItem.findOne({
            where: { 
                Name,
                ServiceId,
                ReceiptId
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

        const item = await RevenueItem.create({
            Name,
            ServiceId,
            ReceiptId,
            Cost,
            IsManual,
            IsOnline
        });

        res.status(201).json({ 
            Message: "record created.", 
            Data: item 
        });

    } catch (error) {

        res.status(400).json({ 
            error: error.message 
        });

    }

};

exports.UpdateRevenueItem = async (req, res) => {

    const {
        Id
    } = req.params;

    const {
        Name,
        ServiceId,
        ReceiptId,
        Cost,
        IsManual,
        IsOnline
    } = req.body;
  
    try {

        const item = await RevenueItem.findByPk(Id);

        if (!item) {
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

        const recordExist = await RevenueItem.findOne({
            where: {
                Name,
                ServiceId,
                ReceiptId,
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

        await item.update({
            Name,
            ServiceId,
            ReceiptId,
            Cost,
            IsManual,
            IsOnline
        });

        res.status(200).json({ 
            Message: "record modified.", 
            Data: item 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }
};

exports.DisableRevenueItem = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const item = await RevenueItem.findByPk(Id);

        if (!item) {
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

        await item.update({
            IsActive: false
        });

        res.status(200).json({ 
            Message: "record disabled.", 
            Data: item 
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });

    }

};

exports.EnableRevenueItem = async (req, res) => {

    const {
        Id
    } = req.params;
  
    try {

        const item = await RevenueItem.findByPk(Id);

        if (!item) {
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

        await item.update({
            IsActive: true
        });

        res.status(200).json({ 
            Message: "record enabled.", 
            Data: item
        });

    } catch (error) {

        res.status(500).json({ 
            error: error.message 
        });
        
    }
};