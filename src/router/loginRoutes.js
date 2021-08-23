const express = require('express')
const router = express.Router()
const connect = require('../../config/conexion')
const util = require('util')
const { json } = require('express')
const query = util.promisify(connect.query).bind(connect)

//const userRouter = require('../router/')

router.post('/', async (req, res) => {

    const { user, pass } = req.body;
    if (user && pass) {
        try {
            const rows = await query(`SELECT * FROM users.user WHERE user = '${user}' AND pass = '${pass}'`)
            if (rows.length > 0) {
                try {
                    const rows = await query(`INSERT INTO users.user (user, pass)
                                VALUES ('${user}', '${pass}')`)
                    res.json({
                        message: "datos insertados correctamente en la BD"
                    })
                } catch (error) {
                    res.json({
                        message: "no se pudo guardar el registro en la BD"
                    })
                }
                res.json({
                    login: true,
                    message: "inicio de sesion correcta"
                })
            } else {
                    res.json({
                    login: false,
                    message: "acceso denegado"
                })
            }
        } catch (error) {
            res.json({
                message: "no se pudo completar el proceso revisa bien tu imformacion"
            })
        }

    } else {
        res.status(400).json({
            login: false,
            message: "asegurate de enviar user and pass"
        })
    }
})

module.exports = router