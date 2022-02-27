const categoryDao = require('../persistence/dao/categoryDao');
const deviceDao = require('../persistence/dao/deviceDao');

async function getAll(categoryName) {
    try {
        rows = await categoryDao.getAll(categoryName);
        return rows;
    } catch (error) {
        console.log("Error on categoryService.getAll " +error);
        throw error;
    }
}

async function save(category) {
    try {
        await categoryDao.save(category);
    } catch (error) {
        console.log("Error on categoryService.save " +error);
        throw error;
    }
}

async function remove(id) {
    try {
        if (id == '') {
            throw new Error("error.category.remove.paramundefined");
        }

        rows = await deviceDao.getAll(id);
        
        if ((rows != null) && (Object.keys(rows).length > 0)) {
            throw new Error("error.category.remove.relatedwithdevice");
        }

        await categoryDao.remove(id);

    } catch (error) {
        console.log("Error on categoryService.remove " +error);
        throw error;
    }
}

module.exports = { getAll, save , remove };