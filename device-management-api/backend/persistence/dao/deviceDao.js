const db = require("../connection/db");

async function getAll(categoryId){
    
    const conn = await db.connect();

    if (categoryId != null) {
        const query = 'SELECT * FROM device WHERE category_id = ?;';
        const params = [categoryId];
        const [rows] = await conn.query(query, params);
        return rows;
    }
    else {
        [rows] = await conn.query('SELECT * FROM device;');
        return rows;
    }
}

async function save(device){
    const conn = await db.connect();
    const sql = 'INSERT INTO device(category_id, color, partnumber) VALUES (?, ?, ?);';
    const values = [device.category.id, device.color, device.partnumber];
    return await conn.query(sql, values);
}

async function remove(id){
    const conn = await connect();
    const sql = 'DELETE FROM device where id=?;';
    return await conn.query(sql, [id]);
}

module.exports = {getAll, save, remove};