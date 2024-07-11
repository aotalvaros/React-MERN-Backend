/* 
    Event Routes
    host + /api/events
*/

const router = require("express").Router();
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

//Todas tienen que estare validadas con JWT
router.use(validarJWT); //Cualquier petición que pase por aquí tiene que tener un token válido, por debajo de esta línea

//Obtener eventos
router.get('/', getEventos);

//Crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);

//Actualizar evento
router.put('/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento 
);

//Borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router;