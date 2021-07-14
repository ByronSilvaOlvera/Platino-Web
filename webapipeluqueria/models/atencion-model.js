const { Schema, model } = require('mongoose');
const Cita = require('./cita-model');
const Servicio = require('./servicio-model');


const AtencionSchema =  Schema({

  fecha     : { type: Date, default: Date.now },
  hora      : { type: String },
  idcita    : { type: Schema.Types.ObjectId, ref : Cita },
  idservicio: [  { uid : {  type: Schema.Types.ObjectId, ref : Servicio } } ]

},
{
  timestamps: true
});
  
module.exports = model('Atencion', AtencionSchema );