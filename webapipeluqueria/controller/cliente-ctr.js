var { request, response } = require('express');
const Cliente = require("../models/cliente-model");

// ok, msg, data

const addEntity = async (req=request, res=response) => {
    try {

        cliente = await Cliente(req.body);
        await cliente.save();
        res.status(200).json({
            ok:true,
            cliente
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: error
        })
       //console.log('Error ', error);
    }
}
const getEntity = async (req=request, res=response) => {
    try {
        const { id } = req.params;
       
        cliente = await Cliente.findById(id);

        res.status(200).json({
            ok:true,
            cliente
        });
        
    } catch (error) {
        console.log('Error ', error);
        res.status(404).json({
            ok: false,
            msg: error
        })
    }
}

const getAllEntityOk = async (req=request, res=response) => {
    try {
        
        clientes = await Cliente.find().exec();

        if( clientes.length > 0 ){    
            res.status(200).json({
                ok:true,
                clientes
            });
        }else{
            res.status(200).json({
                ok:false,
                msg:'No contiene Clientes'                
            });
        }

    } catch (error) {
        console.log('Error ', error);
    }
}
const getAllEntity = async (req=request, res=response) => {
    try {
        const { num, limit = 10  } = req.params;
        
        clientes = await Cliente.find()
            .limit(limit * 1)
            .skip((num - 1) * limit)
            .exec();

        if( clientes.length > 0 ){    
            res.status(200).json({
                ok:true,
                page:num,
                listado:clientes.length,
                clientes
            });
        }else{
            res.status(200).json({
                ok:false,

                msg:'Paginacion completa'                
            });
        }

    } catch (error) {
        console.log('Error ', error);
    }
}
const UpdateEntity = async (req=request, res=response) => {
    try {
        const { id } = req.params;
        const cliente  = req.body;
        
        const response = await Cliente.findOneAndUpdate(
             { _id: id },
             cliente ,
             { new: true }
        ).exec();
        
        res.status(200).json({
            ok:true,
            cliente:response     
        });
        
    } catch (error) {
        console.log('Error ', error);
        res.status(404).json({
            ok: false,
            msg: 'Actulizar cliente: '+error
        })
    }
}

const Atencion = require("../models/atencion-model");
const Cita = require("../models/cita-model");

const deleteEntity = async (req=request, res=response) => {
    try {
        const id = req.params.id;

        cita = await Cita.find({idcliente : id}).exec();
        
        if(cita.length > 0){
            res.status(200).json({
                ok:false,
                msg:`No se puede eliminar cliente! Contiene Citas`
            });
            return
        }

        atencion = await Atencion.find({ idcliente: id}).exec();
        if(atencion.length > 0){
            res.status(200).json({
                ok:false,
                msg:`No se puede eliminar cliente. Tiene Atenciones`
            });
            return
        }

        const deleted = await Cliente.deleteOne( { _id : id } ).exec();            
        if(deleted.ok === 1){
            res.status(200).json({
                ok:true,
                msg:`El cliente de ${id} eliminacion exitosa`
            });
        }else{
            res.status(404).json({
                ok:false,
                msg:`Ocurrio un error al eliminar cliente con ${id}`
            });
        }


    } catch (error) {
        console.log('Error ', error);
        res.status(404).json({
            ok: false,
            msg: 'Eliminar cliente: '+error
        })
    }
}

module.exports = {
    addEntity, getAllEntity, getEntity, 
    getAllEntityOk,
    UpdateEntity, deleteEntity
}