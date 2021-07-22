var { request, response } = require('express');
const Cita = require("../models/cita-model");

// ok, msg, data

const addEntity = async (req=request, res=response) => {
    try {

        cita = await Cita(req.body);
        await cita.save();
        res.status(200).json({
            ok:true,
            cita
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Crear cita => error '+error
        })
    }
}
const getEntity = async (req=request, res=response) => {
    try {
        const { id } = req.params;
       
        cita = await Cita.findById(id)
        .populate('idcliente', 'nombres apellidos')
        .exec();

        res.status(200).json({
            ok:true,
            cita
        });
        
    } catch (error) {
        console.log('Un cita => Error ', error);
        res.status(404).json({
            ok: false,
            msg: error
        })
    }
}

// BUSCAR CITA POR ID CLIENTE
const getCitaCliente = async (req=request, res=response) => {
    try {
        var { id }= req.params;
        console.log(id);
        cita = await Cita.findOne()
        .where('idcliente')
        .equals(id)
        .populate('idcliente', 'nombres apellidos')
        .sort({fecha : -1})
        .exec()
        
        if(cita!=null){

            res.status(200).json({
                ok:true,
                cita     
            });
        }else{
            res.status(200).json({
                ok:false,
                msg: "El cliente no contiene cita"     
            });
        }
        
    } catch (error) {
        console.log('Todas cita =>Error ', error);
        res.status(404).json({
            ok: false,
            msg: error
        })
    }
}

const getAllEntity = async (req=request, res=response) => {
    try {
        const { num, limit = 10 } = req.params;
        
        citas = await Cita.find()
            .limit(limit * 1)
            .skip((num - 1) * limit)
            .populate('idcliente', 'nombres apellidos')
            .sort({fecha : -1})
            .exec();

        if( citas.length > 0 ){    
            res.status(200).json({
                ok:true,
                page:num,
                registro:citas.length,
                citas
            });
        }else{
            res.status(200).json({
                ok:false,
                msg:'Paginacion completa'                
            });
        }

    } catch (error) {
        console.log('Todas cita =>Error ', error);
        res.status(404).json({
            ok: false,
            msg: error
        })
    }
}
const UpdateEntity = async (req=request, res=response) => {
    try {
        const { id } = req.params;
        const { _id , ...cita }  = req.body;

        const response = await Cita.findOneAndUpdate(
             { _id: id },
             cita ,
             { new: true }
        ).exec();        

        res.status(200).json({
            ok:true,
            cita:response     
        });
        
    } catch (error) {
        console.log('Update cita=>Error ', error);
        res.status(404).json({
            ok: false,
            msg: 'Actulizar cita: '+error
        })
    }
}

const Atencion = require("../models/atencion-model");

const deleteEntity = async (req=request, res=response) => {
    try {
        const id = req.params.id;

        atencion = await Atencion.find({ idcita: id}).exec();
        if(atencion.length > 0){
            res.status(200).json({
                ok:false,
                msg:`No se puede eliminar Cita. Tiene Atenciones`
            });
            return
        }

        const deleted = await Cita.deleteOne( { _id : id } ).exec();            
        if(deleted.ok === 1){
            res.status(200).json({
                ok:true,
                msg:`La cita # ${id} eliminada con exito!`
            });
        }else{
            res.status(404).json({
                ok:false,
                msg:`Ocurrio un error al eliminar cita # ${id}`
            });
        }


    } catch (error) {
        console.log('Error ', error);
        res.status(404).json({
            ok: false,
            msg: 'Eliminar cita: '+error
        })
    }
}

module.exports = {
    addEntity, getAllEntity, getEntity, UpdateEntity,
    getCitaCliente, deleteEntity
}