import express from 'express'

const { isAuth } = require('../middelwares/auth')

const router = express.Router()
const db = require('../db')

router.post('/consultas-rango', isAuth, async (req, res) => {

     let start = req.body.start.date
     let end = req.body.end.date

     try {
          const consultas = await db.query(
               `select 
                    c.fecha, 
                    c.hora_i, 
                    c.hora_f, 
                    c.nua,
                    c.nue, 
                    c.asistencia,
                    a.nombres as paciente, 
                    admin.nombres as admin 
               from 
                    consulta c,
                    alumno a, 
                    administrador admin 
               where 
                    c.fecha >= '${start}' 
                         and 
                    c.fecha <= '${end}' 
                         and
                    a.nua = c.nua
                         and
                    admin.nue = c.nue
               `)

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


     try {
          // console.log(req.body)
          const consulta = await db.query(
               `select * from consulta where
                    fecha = '${req.body.fecha}' 
                    and 
                    hora_i = '${req.body.hora_i}'
               `   
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
               res.json({mensaje: 'OK'})
          }
          // console.log('Hola')
     } catch (error) {
          console.log(error)
          return res.status(400).json({
               mensaje: 'Query Error',
               error
           })
     }
})


router.post('/delete', isAuth, async (req, res) => {

     let body = req.body
     console.log(body)

     try {
          const consulta = await db.query(
               `delete from consulta 
               where
                    fecha = '${body.fecha}' 
                    and hora_i = '${body.hora_i}'
                    and nua = '${body.nua}'
               `   
          )

          res.json({mensaje: 'OK'})

     } catch (error) {
          console.log(error)
          return res.status(400).json({
               mensaje: 'Query Error',
               error
           })
     }
})

router.put('/reagendar', isAuth, async ( req, res) => {

     let body = req.body

     try {
          const consulta = await db.query(
               `update consulta 
               set
                    fecha = '${body.fecha}', 
                    hora_i = '${body.hora_i}',
                    hora_f = '${body.hora_f}'
               where
                    fecha = '${body.fecha_old}'
                    and
                    hora_i = '${body.hora_old}'
                    and
                    nua = '${body.nua}'
               `   
          )

          res.json({mensaje: 'OK'})

     } catch (error) {
          console.log(error)
          return res.status(400).json({
               mensaje: 'Query Error',
               error
           })
     }
})


router.get('/consultas-nua/:nua', isAuth, async ( req, res ) => {
     try {
          let fecha = new Date().toISOString().substr(0,10)

          const consultas = await db.query(
               `select * from consulta 
               where
                    nua = '${req.params.nua}'
                    and
                    fecha <= '${fecha}'
               `   
          )
          // console.log(consultas)

          res.json({mensaje: 'OK', consultas})

          
     } catch (error) {
          console.log(error)
          return res.status(400).json({
               mensaje: 'Query Error',
               error
           })
     }
})

router.put('/asistencia/:nua', isAuth, async ( req, res ) => {

     let body = req.body
     

     try {

          const consultas = await db.query(
               `update consulta 

               set asistencia='${req.body.n}'

               where
                    fecha = '${req.body.fecha}'
                    and
                    hora_i = '${req.body.hora_i}' 
                    and
                    nua = '${req.params.nua}'
               `   
          )

          // console.log(consultas)

          res.json({mensaje: 'OK'})

          
     } catch (error) {
          console.log(error)
          return res.status(400).json({
               mensaje: 'Query Error',
               error
           })
     }
})



module.exports = router