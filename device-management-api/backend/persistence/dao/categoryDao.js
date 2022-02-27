const db = require("../connection/db");

async function getAll(categoryName){
    
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
}

async function getCategory(id) {
    const query = 'SELECT * FROM category WHERE id = ?;';
    const [row] = await conn.query(query, id);
    return row;
}

async function save(category){
    const conn = await db.connect();
    const sql = 'INSERT INTO category(name) VALUES (?);';
    const values = [category.name];
    return await conn.query(sql, values);
}

async function remove(id){
    const conn = await db.connect();
    const sql = 'DELETE FROM category where id=?;';
    return await conn.query(sql, id);
}

module.exports = {getAll, save, remove};