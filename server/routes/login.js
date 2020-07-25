import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router();
const db = require('../db');

router.post('/login', async(req, res) => {

    // Recibimos correo y password del body
    let { correo, password } = req.body;

    try {

        const usuario = await db.query(`select * from administrador where correo = '${correo}' and password = '${password}'`);

        if ( usuario.length > 0 ) {

            let payload = {
                id: usuario[0].nue
            };

            const token = jwt.sign(payload, req.app.get('llave'));

            res.json({
                mensaje: 'Autenticado',
                usuario: usuario[0],
                token
            });
            
        } else {
            res.json({
                mensaje: 'INVALID_USERNAME_PASSWORD'
            });
        }
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }
});

module.exports = router;