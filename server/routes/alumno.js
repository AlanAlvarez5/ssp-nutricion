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

router.post('/nuevo', isAuth, async (req, res) => {
     // console.log(req.body.contacto)
     try {
          const NuevoContacto = await db.query(
               `insert into contacto (
                    nombres,
                    apellido_p,
                    apellido_m,
                    telefono,
                    correo,
                    direccion,
                    colonia,
                    ciudad,
                    estado
               ) values (
                    '${req.body.contacto.nombres}',
                    '${req.body.contacto.apellido_p}',
                    '${req.body.contacto.apellido_m}',
                    '${req.body.contacto.telefono}',
                    '${req.body.contacto.correo}',
                    '${req.body.contacto.direccion}',
                    '${req.body.contacto.colonia}',
                    '${req.body.contacto.ciudad}',
                    '${req.body.contacto.estado}'
               )`
          )

          req.body.alumno.contacto_id = NuevoContacto.insertId
          console.log(req.body.alumno)
          const NuevoAlumno = await db.query(
               `insert into alumno (
                    nua,
                    contacto_id,
                    nombres,
                    apellido_p,
                    apellido_m,
                    genero,
                    edad,
                    estado_civil,
                    fecha_nacimiento,
                    ciudad_nacimiento,
                    estado_nacimiento,
                    domicilio_residencia,
                    domicilio_origen,
                    nombre_division,
                    programa_educativo,
                    periodo,
                    fecha_ingreso,
                    correo,
                    descubrimiento,
                    disponibilidad,
                    estado_nutri,
                    fecha_cierre,
                    causas_cierre
               ) values (
                    '${req.body.alumno.nua}',
                    '${req.body.alumno.contacto_id}',
                    '${req.body.alumno.nombres}',
                    '${req.body.alumno.apellido_p}',
                    '${req.body.alumno.apellido_m}',
                    '${req.body.alumno.genero}',
                    '${req.body.alumno.edad}',
                    '${req.body.alumno.estado_civil}',
                    '${req.body.alumno.fecha_nacimiento}',
                    '${req.body.alumno.ciudad_nacimiento}',
                    '${req.body.alumno.estado_nacimiento}',
                    '${req.body.alumno.domicilio_residencia}',
                    '${req.body.alumno.domicilio_origen}',
                    '${req.body.alumno.nombre_division}',
                    '${req.body.alumno.programa_educativo}',
                    '${req.body.alumno.periodo}',
                    '${req.body.alumno.fecha_ingreso}',
                    '${req.body.alumno.correo}',
                    '${req.body.alumno.descubrimiento}',
                    '${req.body.alumno.disponibilidad}',
                    '${req.body.alumno.estado_nutri}',
                    NULL,
                    NULL
               )`
          )
          res.json({
               mensaje: 'AGREGADO',
               paciente: req.body.alumno
               }
          )
     } catch (error) {
          return res.status(400).json({
               mensaje: 'Query Error',
               error
           })
     }

})
module.exports = router