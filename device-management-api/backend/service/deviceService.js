const deviceDao = require('../persistence/dao/deviceDao');
const categoryService = require('./categoryService');

async function getAll(categoryId) {
    try {
        rows = await deviceDao.getAll(categoryId);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getDevice(id) {
    try {
        if (id == null) {
            throw new Error("error.device.getdevice.paramundefined")
        }
        rows = await deviceDao.getDevice(id);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function save(device) {
    try {
        device = await categoryService.getDevice([device.category.id]);
        if (device == null) {
            throw new Error("error.device.categoryinvalid");
        }
        await deviceDao.save(device);
    } catch (error) {
        
    }
}

async function remove(id) {
    try {
      if (id == null) {
        throw new Error("error.device.remove.paramundefined");
      }  
      await deviceDao.remove(id);  
    } catch (error) {

    }
}

module.exports = { getAll, save , remove};