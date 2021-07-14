const { Schema, model } = require('mongoose');


const ClienteSchema =  Schema({
    nombres       : { type: String, required:true },
    apellidos     : { type: String, required:true },
    identificacion: { type: String, required:true, unique : true},
    telefono      : { type: String, required:true},
    email         : { type: String, required:true, unique : true},
    direccion     : { type: String, required:true},
    fechanacio    : { type: Date, default: Date.now },
    
  },
  {
      timestamps: true
  }
  );
  

  module.exports = model('Cliente', ClienteSchema );