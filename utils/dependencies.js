const { Op, Sequelize  } = require("sequelize");
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const os = require("os");
const crypto = require("crypto"); 
const { 
    body, 
    validationResult 
} = require("express-validator");

module.exports = {
    Op,
    fs,
    path,
    multer,
    sharp,
    bcrypt,
    jwt,
    os,
    Sequelize,
    body,
    validationResult,
    crypto
};