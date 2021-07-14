const { Schema, model } = require('mongoose');
import { Cita } from "./cita-model";
import { Servicio } from "./servicio-model";

const AtencionSchema =  Schema({

  fecha     : { type: Date, default: Date.now },
  hora      : { type: String },
  idCita    : { type: Cita.objectId, ref : 'Cita'},
  idservicio: { type: Servicio.objectId, ref : 'Servicio'}
    
  });
  
  module.exports = model('Atencion', AtencionSchema );