const Mongoose = require("mongoose");
const debug = require("debug")("app:mongoose");

const dbhost =  process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "autominderproject";

Mongoose.set('strictQuery', true);

const dburi = process.env.DBURI || `mongodb://${dbhost}:${dbport}/${dbname}-test`;

//const dburi = `mongodb://${dbhost}:${dbport}/${dbname}-test`;

const connect = async () => {
    try{
        await Mongoose.connect(dburi);
        debug(`Connected to ${dburi}`);
    }catch{
        debug("Error connecting to database");
        process.exit(1);
    }
};

module.exports = {
    connect
}