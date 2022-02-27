const express = require("express");
const bodyParser = require("body-parser");
const categoryService = require("./service/categoryService");

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

    console.log(nameCategory);
    console.log(categories);

    res.status(getSuccessStatus).json({
        message: 'category.success.fetched',    
        categories: categories
    });
});

app.post('/api/category', async (req, res, next) => {
    const post = req.body;
    console.log(post);
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

module.exports = app;