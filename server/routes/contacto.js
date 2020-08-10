import express from 'express'

const { isAuth } = require('../middelwares/auth')

const router = express.Router()
const db = require('../db')

router.get('/:id', isAuth, async (req, res) => {

     let id = req.params.id

     try {
          const contacto = await db.query(`select * from contacto where id = ${id}`);
          res.json(contacto[0])

     } catch (error) {

          console.log(error)
          return res.status(400).json({
               mensaje: 'Query Error',
               error
           })
     }
})


module.exports = router