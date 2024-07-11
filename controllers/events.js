const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find().populate('user','name');

    res.json({
        ok: true,
        eventos
    });

}

const crearEvento = async (req, res = response) => {

    //Verificar que tenga el evento
    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;
        
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log("🚀 ~ crearEvento ~ error:", error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarEvento = async (req, res = response) => {
    const eventoId = req.params.id; //id del evento
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId ); //Busca el evento por el id

        if ( !evento ) { //Si no existe el evento
            return res.status(404).json({//Retorna un error
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) { //Si el evento no pertenece al usuario
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        //Actualiza el evento
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } ); //new: true para que devuelva el evento actualizado

        res.json({
            ok: true,
            evento: eventoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administradore'
        });
    }

}

const eliminarEvento = async (req, res = response) => {
    const eventoId = req.params.id; //id del evento
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId ); 

        if ( !evento ) { //Si no existe el evento
            return res.status(404).json({//Retorna un error
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) { //Si el evento no pertenece al usuario
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

       //Elimina el evento
       await Evento.findByIdAndDelete( eventoId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administradore'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}