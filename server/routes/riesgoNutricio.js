-import express from 'express'

const { isAuth } = require('../middelwares/auth')

const router = express.Router()
const db = require('../db')

router.post('/nuevo', isAuth, async(req, res) => {
    const body = req.body

    try {
        const riesgoNutri = await db.query(
            `insert into riesgo_nutricio (
                nua,
                periodo,
                padecimiento_actual,
                cirugias,
                tratamiento,
                n_comidas,
                desayuno,
                comida,
                cena,
                colaciones,
                hora_apetito,
                lugar_comida,
                cocinero,
                servicios_basicos,
                cantidad_agua,
                consumo_tablaco,
                cantidad_tabaco,
                consumo_alcohol,
                cantidad_alcohol,
                consumo_azucar,
                cantidad_azucar,
                criterio_1,
                criterio_2,
                criterio_3,
                criterio_4,
                criterio_5,
                diagnostico,
                institucion
            ) values (
                '${body.nua}',
                '${body.periodo}',
                '${body.padecimiento_actual}',
                '${body.cirugias}',
                '${body.tratamiento}',
                '${body.n_comidas}',
                '${body.desayuno}',
                '${body.comida}',
                '${body.cena}',
                '${body.colaciones}',
                '${body.hora_apetito}',
                '${body.lugar_comida}',
                '${body.cocinero}',
                '${body.servicios_basicos}',
                '${body.cantidad_agua}',
                '${body.consumo_tablaco}',
                '${body.cantidad_tabaco}',
                '${body.consumo_alcohol}',
                '${body.cantidad_alcohol}',
                '${body.consumo_azucar}',
                '${body.cantidad_azucar}',
                '${body.criterio_1}',
                '${body.criterio_2}',
                '${body.criterio_3}',
                '${body.criterio_4}',
                '${body.criterio_5}',
                '${body.diagnostico}',
                '${body.institucion}'
            )`)        
            res.json({mensaje: 'OK'})
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }
})

router.get('/:nua', isAuth, async(req, res) => {
    const nua = req.params.nua
    try {
        const lista = await db.query(`select * from riesgo_nutricio where nua = '${nua}'`)

        res.json({
            mensaje: 'OK',
            lista: lista
        })
    } catch (error) {
        return error.status(400).json({
            mensaje: 'Query Error',
            error
        })
    }

})

/* insert into riesgo_nutricio (
    nua,
    periodo,
    padecimiento_actual,
    cirugias,
    tratamiento,
    n_comidas,
    desayuno,
    comida,
    cena,
    colaciones,
    hora_apetito,
    lugar_comida,
    cocinero,
    servicios_basicos,
    cantidad_agua,
    consumo_tablaco,
    cantidad_tabaco,
    consumo_alcohol,
    cantidad_alcohol,
    consumo_azucar,
    cantidad_azucar,
    criterio_1,
    criterio_2,
    criterio_3,
    criterio_4,
    criterio_5,
    diagnostico,
    institucion
) values (
    '231223',
    'Ago-Dic2020',
    'asedeasdas',
    'asedeasdas',
    'asedeasdas',
    112312,
    false,
    false,
    false,
    false,
    'asdas',
    'asdas',
    'asdas',
    false,
    30.33,
    true,
    23.1,
    true,
    20.1,
    true,
    20.1,
    'asdasd',
    'asdasd',
    'asdasd',
    'asdasd',
    'asdasd',
    'asdasd',
    'asdasd') */

module.exports = router