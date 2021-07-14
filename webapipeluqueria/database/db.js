
const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        
        await mongoose.connect(process.env.DB_CNNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.info("BD en Linea Mongo");
    } catch (error) {
        console.error("Error", error);
        throw new Error('Error en la base de datos - Hable con el admin');
    }

}


module.exports = {
    dbConnection
}