const db = require("../connection/db");

async function getAll(categoryName){
    try {
        const conn = await db.connect();

        if (categoryName != null) {
            const query = 'SELECT * FROM category WHERE name like ?;';
            const params = ['%' + categoryName + '%'];
            const [rows] = await conn.query(query, params);
            return rows;
        }
        else {
            [rows] = await conn.query('SELECT * FROM category;');
            return rows;
        }
    } catch(error) {
        throw error;
    }
}

async function getCategory(id) {
    try {
        const conn = await db.connect();
        const query = 'SELECT * FROM category WHERE id = ?;';
        const params = [id];
        const [row] = await conn.query(query, params);
        return row;
    } catch (error) {
        throw error;
    }
}

async function save(category){
    try {
        const conn = await db.connect();
        const sql = 'INSERT INTO category(name) VALUES (?);';
        const values = [category.name];
        return await conn.query(sql, values);
    } catch (error) {
        throw error;
    }
}

async function remove(id){
    try {
        const conn = await db.connect();
        const sql = 'DELETE FROM category where id=?;';
        return await conn.query(sql, id);
    } catch (error) {
        throw error;
    }
}

module.exports = {getAll, save, remove, getCategory};