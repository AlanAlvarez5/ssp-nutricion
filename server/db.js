import mysql from 'mysql'
import { promisify } from 'util'


const connection = {
    host: 'localhost',
    user: 'root',
    password: 'easiermean5'
}

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

    if (connection) connection.release();
    console.log('Base de datos conectada');

    return;
});

pool.query = promisify(pool.query);

module.exports = pool;