const express = require("express")


const app  =express()
const cors = require("cors")
const morgan = require("morgan")
const ApiError = require("./utils/ApiError")
const ErrorHandling = require("./middlewares/ErrorHandler")

// CORS configuration
const corsOptions = {
    origin: [
        "https://billing-software-0owd.onrender.com",
        "http://localhost:5173", // for local development
        "http://localhost:3000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}
app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use("/api/v1/pay/",require("./routes/webhook"))
app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended:false}))

app.use("/api/v1",require("./routes"))

app.use("*",(req,res)=>{
    throw new ApiError(404,"page not found")
})

app.use(ErrorHandling)
module.exports  =app