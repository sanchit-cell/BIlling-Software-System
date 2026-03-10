const { default: mongoose } = require("mongoose");
const { PUBLIC_DATA } = require("../../constant");

exports.ConnectDB = async()=>{
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(PUBLIC_DATA.mongo_uri)
        console.log(`the app is connect with ${mongoose.connection.host}`);
    } catch (error) {
            console.error("MongoDB connection error:", error.message);
            mongoose.disconnect();
            process.exit(1)
    }
}