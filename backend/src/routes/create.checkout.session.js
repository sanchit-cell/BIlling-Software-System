const express = require("express")
const bodyParser = require("body-parser");
const Authentication = require("../middlewares/Authentication"); 
const router = express.Router();
const stripe = require("stripe")("sk_test_51Pi0gZ2MYvAYdxOMPqXpTPaDXjzkntCYnusDPXwTWBCUKNCjv9VXNNLjVSbHnuG8qJj2u5NXWaGm8PNaTAKCdZSq00KhK0mjkR")


module.exports = router
router.use(Authentication);


router.post("/create-checkout-session",async(req,res)=>{
    const {products,orderId} = req.body
    const userid = req?.user
    console.log("where the undefind is ",userid)
    const amount = Number(products.map((cur) =>cur.price ).reduce((a,c)=>a+c,0))*100

    lineItems = products.map((p)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name: p.item_name
            },
            unit_amount: amount
        },
        quantity: 1
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items:lineItems,
        mode: "payment",
        
        success_url:"https://billing-software-0owd.onrender.com/orders",
        cancel_url: "https://billing-software-0owd.onrender.com/cancel",
        metadata: {
            orderId: orderId,
            userid : userid
          }

    });
    res.json({id:session.id})
    
})




  
  