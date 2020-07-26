import express from 'express'

const { isAuth } = require('../middelwares/auth')

const router = express.Router()
const db = require('../db')

router.get('/', isAuth, async (req, res) => {

     try {
          const alumnos = await db.query(`select * from alumno`);
          res.json(alumnos)

     } catch (error) {
          return res.status(400).json({
               mensaje: 'Query Error',
               error
           })
     }
})

module.exports = router