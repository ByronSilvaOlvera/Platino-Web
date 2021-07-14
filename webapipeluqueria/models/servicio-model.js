const { Schema, model } = require('mongoose');

const ServicioSchema =  Schema({

  nombre: { type: String },
  precio: { type: String, required:true},
  tiempo: { type: String, ref : 'Cita'},
  
});
  
module.exports = model('Servicio', ServicioSchema );