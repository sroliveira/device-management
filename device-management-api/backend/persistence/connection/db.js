async function connect(){
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://devicemanagement:managementDevice@localhost:13306/device");
    console.log("MySQL connected!");
    global.connection = connection;
    return connection;
}

module.exports = {connect};