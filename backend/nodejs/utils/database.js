const mongoose = require('mongoose');

const { connection, connect } = mongoose;

//check if the database is connected
connection.on('open', () => {
    //log a message
    console.log('database is connected ⚡');
})

//the function that connects to the database
async function database() {
    try {
        //connect to the database
        await connect(process.env.DB_URL, { dbName: "Afriverse" });
    } catch (err) {
        console.log(err)
    }
}

//export the function
module.exports = database