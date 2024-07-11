const moment = require('moment'); 

const isDate = ( value ) => {

    //Si no viene nada, devolvemos false
    if ( !value )  return false;

    const fecha = moment( value ); //Si viene algo, lo parseamos con moment, el momento en el que se ejecuta la función
    return !!(fecha.isValid()); //Si es válido, devolvemos true, si no, false
    
}

module.exports = { isDate };