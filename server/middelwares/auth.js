const jwt = require("jsonwebtoken")

let isAuth = (req, res, next) => {

     // Recibir el token que mandamos de los headers
     let token = req.get('token')

     jwt.verify(token, req.app.get('llave'), (err, decoded) => {

          // Si hay un error al decodificar el token o no existe
          if (err){
               return res.status(401).json({
                    mensaje: 'No autorizado',
                    err
               })
          }

          // Creamos una nueva propiedad en el req
          req.nue = decoded.usuario.nue
          // console.log(decoded.usuario.nue)
          next()
     })

}

module.exports = { isAuth }