const mongoose = require("mongoose")


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.Mongoo_URI)
        console.log("DataBase Connect Successfully" , conn.connection.name.bgCyan)
        // console.log(conn.connection.name)
    } catch (error) {
        console.log("DataBase Connect Failed" , error.message.bgred)
    }
}


module.exports = connectDB