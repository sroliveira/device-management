const deviceDao = require('../persistence/dao/deviceDao');
const categoryDao = require('../persistence/dao/categoryDao');

async function getAll(categoryId) {
    try {
        rows = await deviceDao.getAll(categoryId);
        return rows;
    } catch (error) {
        console.log("Error on deviceService.getAll " +[error]);
        throw error;
    }
}

async function save(device) {
    try {
        category = await categoryDao.getCategory([device.category.id]);
        if (category == null) {
            console.log("Categoria foi considerada nula");
            throw new Error("error.device.categoryinvalid");
        }
        await deviceDao.save(device);
    } catch (error) {
        console.log("Error on deviceService.getAll " +error);
        throw error;
    }
}

async function remove(id) {
    try {
      if (id == '') {
        throw new Error('error.device.remove.paramundefined');
      }
      console.log("ID recebido: "+[id]);
      await deviceDao.remove(id);  
    } catch (error) {
        console.log("Error on deviceService.remove " +error);
        throw error;
    }
}

module.exports = { getAll, save , remove};