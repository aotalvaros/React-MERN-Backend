const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => { // next es el callback que se ejecuta si todo sale bien

    // x-token headers
    const token = req.header('x-token'); // x-token es el nombre del header que se envía en la petición

    if ( !token ) { // si no hay token
        return res.status(401).json({ 
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid, name } = jwt.verify( 
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();
}


module.exports = {
    validarJWT
}