const { Schema, model } = require('mongoose');
const Cliente = require('./cliente-model');

const CitaSchema =  Schema({
  fecha      : { type: Date, default: Date.now, required:true },
  hora       : { type: String , required:true},
  descripcion: { type: String, required:true},
  // Pendiente No asistio Asistida
  estado     : { type: String, required:true, default: "Pendiente"},
  idcliente  : { type: Schema.Types.ObjectId, ref: Cliente },
  
  },
  {
    timestamps: true
  }
  );
  

  module.exports = model('Cita', CitaSchema );