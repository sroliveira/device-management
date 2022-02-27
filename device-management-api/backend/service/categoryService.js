const categoryDao = require('../persistence/dao/categoryDao');
const deviceService = require('./deviceService');

async function getAll(categoryName) {
    try {
        rows = await categoryDao.getAll(categoryName);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function save(category) {
    try {
        await categoryDao.save(category);
    } catch (error) {
        
    }
}

async function remove(id) {
    try {
        if (id == null) {
            throw new Error("error.category.remove.paramundefined");
        }

        rows = await deviceService.getAll(id);
        
        if ((rows != null) && (Object.keys(rows).length > 0)) {
            throw new Error("error.category.remove.relatedwithdevice");
        }

        await categoryDao.remove(id);

    } catch (error) {
        console.log('Erro: ' + error);
    }
}

module.exports = { getAll, save , remove };