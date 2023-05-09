const Mongoose = require("mongoose");
const debug = require("debug")("app:mongoose");

const dbhost =  process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "autominder-app";


debug("Starting connection to database...");

// const dburi ="localhost:3500";  // USAR SOLAMENTE PARA TESTEAR LOCALMENTE LA CONEXION DE LA API CON EL LOCALHOST DE LA PC.

const dburi =`mongodb://${dbhost}:${dbport}/${dbname}`; // USAR PARA TESTEAR LA CONEXION A LA BASE CON DOCKER CONTENIENDO A MONGO ACTIVAMENTE.

// process.env.DBURI || USAR COMO URI DE CONEXION A BASE MONGO MONTADA EN LINEA

debug("Connection string received, trying connection..."); 


const connect = async () => {
    
    try{
        Mongoose.set("strictQuery", false);
        await Mongoose.connect(dburi), {useNewUrlParser: true};  // Intento de conexion
        debug(`Succesfuly connected to Mongo database!`); //Confirmación en consola de conexión

    } catch (error){
       
        debug("ERROR: Connecting to database has not been possible.");
        
        process.exit(1);

    }

    
};

module.exports = {
    connect
}