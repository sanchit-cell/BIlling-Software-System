const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    item_name : {
        type: String,
        required: true,
    },
    Quantity:{
        type:Number,
        required: true,

    },
    About:{
        type:String,
        rquired:true
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    price:{
        type:Number,
        required:true
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Items", Schema);

module.exports = model;
