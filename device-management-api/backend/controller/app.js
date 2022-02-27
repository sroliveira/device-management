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

app.use((Ireq, res, next) => {
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, DELETE, OPTIONS, PATCH");
    next();
});

app.get('/api/categories', async (req, res, next) => {
    
    var nameCategory = req.query.nameCategory;

    const categories = await categoryService.getAll(nameCategory);

    res.status(getSuccessStatus).json({
        message: 'category.success.fetched',    
        categories: categories
    });
});

app.post('/api/category', async (req, res, next) => {
    const post = req.body;
    categoryService.save(post);
    res.status(postSuccessStatus).json({
        message: 'category.success.added'
    });
})

app.delete('/api/category', async (req, res, next) => {
    var categoryId = req.query.categoryId;
    categoryService.remove(categoryId);
    res.status(deleteSuccessStatus).json({
        message: 'category.success.removed'
    });
})

app.get('/api/devices', async (req, res, next) => {
    
    var categoryId = req.query.categoryId;

    const devices = await deviceService.getAll(categoryId);

    res.status(getSuccessStatus).json({
        message: 'device.success.fetched',    
        devices: devices
    });
});

app.post('/api/device', async (req, res, next) => {
    const post = req.body;
    deviceService.save(post);
    res.status(postSuccessStatus).json({
        message: 'device.success.added'
    });
})

app.delete('/api/device', async (req, res, next) => {
    var deviceId = req.query.deviceId;
    deviceService.remove(deviceId);
    res.status(deleteSuccessStatus).json({
        message: 'device.success.removed'
    });
})

module.exports = app;