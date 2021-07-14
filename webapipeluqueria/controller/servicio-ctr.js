var { request, response } = require('express');
const Servicio = require("../models/servicio-model");

// ok, msg, data

const addEntity = async (req=request, res=response) => {
    try {

        servicio = await Servicio(req.body);
        await servicio.save();
        res.status(200).json({
            ok:true,
            servicio
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Crear servicio => error '+error
        })
    }
}
const getEntity = async (req=request, res=response) => {
    try {
        const { id } = req.params;
       
        servicio = await Servicio.findById(id);

        res.status(200).json({
            ok:true,
            servicio
        });
        
    } catch (error) {
        console.log('Un servicio => Error ', error);
        res.status(404).json({
            ok: false,
            msg: error
        })
    }
}
const getAllEntity = async (req=request, res=response) => {
    try {
        const { num, limit = 6 } = req.params;
        
        servicios = await Servicio.find()
            .limit(limit * 1)
            .skip((num - 1) * limit)
            .exec();

        if( servicios.length > 0 ){    
            res.status(200).json({
                ok:true,
                page:num,
                servicios
            });
        }else{
            res.status(200).json({
                ok:false,
                msg:'Paginacion completa'                
            });
        }

    } catch (error) {
        console.log('Todas servicios =>Error ', error);
        res.status(404).json({
            ok: false,
            msg: "Get all servico=> Error: " + error
        })
    }
}
const UpdateEntity = async (req=request, res=response) => {
    try {
        const { id } = req.params;
        const servicio  = req.body;

        const response = await Servicio.findOneAndUpdate(
             { _id: id },
             servicio ,
             { new: true }
        ).exec();        

        res.status(200).json({
            ok:true,
            servicio:response     
        });
        
    } catch (error) {
        console.log('Update cita=>Error ', error);
        res.status(404).json({
            ok: false,
            msg: 'Actulizar servicio=> Error: '+error
        })
    }
}
const deleteEntity = async (req=request, res=response) => {
    try {
        
    } catch (error) {
        console.log('Error ', error);
    }
}

module.exports = {
    addEntity, getAllEntity, getEntity, UpdateEntity
}