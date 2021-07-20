var { request, response } = require('express');
const Atencion = require("../models/atencion-model");

// ok, msg, data

const addEntity = async (req=request, res=response) => {
    try {
        console.log('add atencion ' ,req.body);
        atencion = await Atencion(req.body);
        await atencion.save();
        res.status(200).json({
            ok:true,
            atencion
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Crear Atencion => error: '+error
        })
    }
}
const getEntity = async (req=request, res=response) => {
    try {
        const { id } = req.params;
       
        atencion = await Atencion.findById(id)
            .populate('idcliente', 'nombres apellidos')
            .exec();

        res.status(200).json({
            ok:true,
            atencion
        });
        
    } catch (error) {
        console.log('Una Atencion  => Error: ', error);
        res.status(404).json({
            ok: false,
            msg: error
        })
    }
}
const getAllEntity = async (req=request, res=response) => {
    try {
        const { num, limit = 6 } = req.params;

        
        atencion = await Atencion.find()
            .limit(limit * 1)
            .skip((num - 1) * limit)
            .sort({fecha : -1}) // reciente a antigua
            .populate('idcliente', 'nombres apellidos')
            .populate('idservicio', 'nombre')
            .exec();

        if( atencion.length > 0 ){    
            res.status(200).json({
                ok:true,
                page:num,
                atencion
            });
        }else{
            res.status(200).json({
                ok:false,
                msg:'Paginacion completa'                
            });
        }

    } catch (error) {
        console.log('Todas Atencion =>Error ', error);
        res.status(404).json({
            ok: false,
            msg: error
        })
    }
}

const getAllEntityFilter = async (req=request, res=response) => {
    try {
        const { num, limit = 6 } = req.params;
        
        
        atencion = await Atencion.find(
            {
                created_on : { $gte: new Date("2021-07-14"),$lt: new Date("2021-07-15") }
            }
        )
            .limit(limit * 1)
            .skip((num - 1) * limit)            
            .exec();

        if( atencion.length > 0 ){    
            res.status(200).json({
                ok:true,
                page:num,
                atencion
            });
        }else{
            res.status(200).json({
                ok:false,
                msg:'Paginacion completa'                
            });
        }

    } catch (error) {
        console.log('Todas Atencion =>Error ', error);
        res.status(404).json({
            ok: false,
            msg: error
        })
    }
}



const UpdateEntity = async (req=request, res=response) => {
    try {
        const { id } = req.params;
        const atencion  = req.body;

        const response = await Atencion.findOneAndUpdate(
             { _id: id },
             atencion ,
             { new: true }
        ).exec();        

        res.status(200).json({
            ok:true,
            atencion:response     
        });
        
    } catch (error) {
        console.log('Update atencion=>Error ', error);
        res.status(404).json({
            ok: false,
            msg: 'Actulizar atencion => Error: '+error
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
    addEntity, getAllEntity, getEntity, UpdateEntity, getAllEntityFilter
}