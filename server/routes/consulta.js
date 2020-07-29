import express from 'express'

const { isAuth } = require('../middelwares/auth')

const router = express.Router()
const db = require('../db')
// alumno
router.post('/consultas-rango', isAuth, async (req, res) => {

     let start = req.body.start.date
     let end = req.body.end.date
     // console.log(start, end)
     try {
          // console.log('Hola')
          // const consultas = await db.query(`select * from consulta where fecha >= '${start}' and fecha <= '${end}' `);
          const consultas = await db.query(
               `select c.fecha, c.hora_i, c.hora_f, c.nua, c.nue, c.asistencia,
                         a.nombres as paciente, admin.nombres as admin from consulta c, alumno a, administrador admin where c.fecha >= '${start}' and c.fecha <= '${end}' `)
          
          // console.log(full)
          res.json(consultas)
     } catch (error) {
          console.log(error)
          return res.status(400).json({
               mensaje: 'Query Error',
               error
           })
     }
})

router.post('/nuevo', isAuth, async (req, res) => {

     // let start = req.body.start.date
     // let end = req.body.end.date
     // console.log(start, end)
     try {
          // console.log(req.body)
          const consulta = await db.query(
               `select * from consulta where
                    fecha = '${req.body.fecha}' 
                    and hora_i = '${req.body.hora_i}'`   
          )
          // console.log(consulta.length)
          if(consulta.length > 0){
               res.json({
                    mensaje: 'Consulta Existente'
               })
          }else{
               const nuevaConsulta = await db.query(
                    `insert into consulta (
                         fecha,
                         hora_i,
                         hora_f,
                         nua,
                         nue
                    ) values(
                         '${req.body.fecha}',
                         '${req.body.hora_i}',
                         '${req.body.hora_f}',
                         '${req.body.nua}',
                         '${req.body.nue}'
                    )`
                    
               );
               // console.log(consultas)
               res.json({mensaje: 'Consulta Agregada'})
          }
          // console.log('Hola')
     } catch (error) {
          // console.log(error)
          return res.status(400).json({
               mensaje: 'Query Error',
               error
           })
     }
})
router.put('/editar', isAuth, async (req, res) => {

     // let start = req.body.start.date
     // let end = req.body.end.date
     // console.log(start, end)
     try {
          const consulta = await db.query(
               `select * from consulta 
               where
                    fecha = '${req.body.fecha}' 
                    and hora_i = '${req.body.hora_i}'
               `   
          )

          if (consulta > 0){
               res.json({
                    mensaje: 'Consulta Existente'
               })
          } else{
               const editar = await db.query(
                    `update consulta set
                         fecha = '${req.body.fecha}',
                         hora_i = '${req.body.hora_i}',
                         hora_f = '${req.body.hora_f}',
                         nua = '${req.body.nua}',
                         nue = '${req.body.nue}'
                    where 
                         fecha = '${req.body.fecha}' and
                         hora_i = '${req.body.hora_i}'
                    `
                    
               );
               res.json({mensaje: 'OK'})
          }
          // console.log(consultas)

          // console.log('Hola')
     } catch (error) {
          // console.log(error)
          return res.status(400).json({
               mensaje: 'Query Error',
               error
           })
     }
})



module.exports = router