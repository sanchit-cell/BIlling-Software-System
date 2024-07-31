const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user',
                required:true
            }   , 
            consumer:{
            type:mongoose.Schema.Types.ObjectId,
                ref:'Consumer',
                required:true
            }  ,

                    Items:[{
                        type:mongoose.Schema.Types.ObjectId,
                ref:'Items',
                required:true
                    }] ,
    
            isActive:{
                type:Boolean,
                default:true
            },
            paymentStatus: {
                type: String,
                enum: ['Pending', 'Completed', 'Failed'],
                default: 'Pending'
              },
              transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  }

},{timestamps:true});


const model = mongoose.model("Order",Schema)

module.exports = model