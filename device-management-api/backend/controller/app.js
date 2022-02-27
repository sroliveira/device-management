const express = require("express");
const bodyParser = require("body-parser");
const categoryService = require("../service/categoryService");
const deviceService = require("../service/deviceService");

const app = express();

app.use(bodyParser.json()); //analisa corpo conteúdo JSON
app.use(bodyParser.urlencoded({ extended:false })); //analisa outros tipos de encoding

const getSuccessStatus = 200;
const postSuccessStatus = 201;
const deleteSuccessStatus = 200;
const internalServerError = 500;
const badRequest = 400;

app.use((Ireq, res, next) => {
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, DELETE, OPTIONS, PATCH");
    next();
});

app.get('/api/categories', async (req, res, next) => {
    
    try {
        var nameCategory = req.query.nameCategory;

        const categories = await categoryService.getAll(nameCategory);

        res.status(getSuccessStatus).json({
            message: 'category.success.fetched',    
            categories: categories
        });
    } catch(error) {
        res.status(internalServerError).json({
            message: error.message,
            categories: null
        });
    }
});

app.post('/api/category', async (req, res, next) => {
    try {
        const post = req.body;
        await categoryService.save(post);
        res.status(postSuccessStatus).json({
            message: 'category.success.added'
        });
    } catch(error) {
        res.status(internalServerError).json({
            message: error.message
        });
    }
})

app.delete('/api/category', async (req, res, next) => {
    try {
        var categoryId = req.query.categoryId;
        await categoryService.remove(categoryId);
        res.status(deleteSuccessStatus).json({
            message: 'category.success.removed'
        });
    } catch(error) {
        if ((error.message == 'error.device.remove.paramundefined') ||
            (error.message == 'error.category.remove.relatedwithdevice')) {
            res.status(badRequest).json({
                message: error.message
            });    
        } else {
            res.status(internalServerError).json({
                message: error.message
            });
        }
    }
})

app.get('/api/devices', async (req, res, next) => {
    try {
        var categoryId = req.query.categoryId;

        const devices = await deviceService.getAll(categoryId);

        res.status(getSuccessStatus).json({
            message: 'device.success.fetched',    
            devices: devices
        });
    } catch(error) {
        res.status(internalServerError).json({
            message: error.message,    
            devices: null
        });
    }
});

app.post('/api/device', async (req, res, next) => {
    try {
        const post = req.body;
        await deviceService.save(post);
        res.status(postSuccessStatus).json({
            message: 'device.success.added'
        });
    } catch(error) {
        res.status(internalServerError).json({
            message: error.message
        });
    }
    
})

app.delete('/api/device', async (req, res, next) => {
    try {
        var deviceId = req.query.deviceId;
        await deviceService.remove(deviceId);
        res.status(deleteSuccessStatus).json({
            message: 'device.success.removed'
        });
    } catch(error) {
        if (error.message == 'error.device.remove.paramundefined') {
            res.status(badRequest).json({
                message: error.message
            });    
        } else {
            res.status(internalServerError).json({
                message: error.message
            });
        }
    }
})

module.exports = app;