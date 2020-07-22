import mysql from 'mysql'
import { promisify } from 'util'

import { connection } from './configs/config'

const pool = mysql.createPool(connection);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DB: Conexión Perdida');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DB: Demasiadas conexiones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DB: Conexion denegada');
        }
    }

    if (connection){
        connection.release();
        console.log('DB: Conectada');
    }else{
        console.log('DB: Fallo en conexión')
    }
        

    return;
});

pool.query = promisify(pool.query);

module.exports = pool;