const mongoose = require('mongoose');
const { MONGODB_URI} = require('../config/index')



const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.MONGODB_URI , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }


}


module.exports = {
    dbConnection
}
