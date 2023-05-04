const Mongoose = require("mongoose");
const debug = require("debug")("app:mongoose");

const dbhost =  process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "autominder-app";

//  const dburi ="localhost:3500";  USAR SOLAMENTE PARA TESTEAR LOCALMENTE LA CONEXION DE LA API

const dburi =`mongodb://${dbhost}:${dbport}/${dbname}`;

// process.env.DBURI || URI A COLOCAR EN dburi 

const connect = async () => {
    
    try{
        
        await Mongoose.connect(dburi);  // Intento de conexion
        
        debug(`Succesfuly connected to Mongo database > ${dburi}!`); //Confirmación en consola de conexión

    } catch (error){
       
        debug("ERROR: connecting to database has not been possible. Check mongoose.js file.");
        
        process.exit(1);

    }
};

module.exports = {
    connect
}