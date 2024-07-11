const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    return new Promise( (resolve, reject) => { // resolve y reject son funciones que se pasan como argumentos a la función que se retorna

        const payload = { uid, name }; // payload es la información que se quiere guardar en el token

        jwt.sign( payload, process.env.SECRET_JWT_SEED, { // se crea el token, se pasa el payload, la semilla y la configuración
            expiresIn: '2h' // tiempo de expiración del token
        }, (err, token ) => { // callback que se ejecuta cuando se crea el token

            if ( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );

        })

    })
}

module.exports = {
    generarJWT
}