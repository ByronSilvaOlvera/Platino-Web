const { Schema, model } = require('mongoose');
import { Cliente } from './cliente-model';

const CitaSchema =  Schema({
  fecha      : { type: Date, default: Date.now },
  hora       : { type: String, default: Date.now },
  descripcion: { type: String, required:true},
  // Pendiente No asistio Asistida
  estado     : { type: String, required:true, default: "Pendiente"},
  idcliente  : { type: Cliente.objectId, ref: 'Cliente' },
  
  });
  

  module.exports = model('Cita', CitaSchema );