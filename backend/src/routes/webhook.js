const express = require("express")
const bodyParser = require("body-parser");
const router = express.Router();
const stripe = require("stripe")("sk_test_51Pi0gZ2MYvAYdxOMPqXpTPaDXjzkntCYnusDPXwTWBCUKNCjv9VXNNLjVSbHnuG8qJj2u5NXWaGm8PNaTAKCdZSq00KhK0mjkR")
const Transaction = require("../models/Transaction.model")
const Order = require("../models/Orders.models");
// const Authentication = require("../middlewares/Authentication"); 


module.exports = router
const endpointSecret = "whsec_wZwhdifgy4J7gn4nXQh0wkZLsrK9sd66";






  
  const createOrder = async(session) => {
    const orderId = session.metadata.orderId;


    const transaction = new Transaction({
        user:session.metadata.userid,
        sessionId: session.id,
        amount: session.amount_total,
        currency: session.currency,
        paymentStatus: session.payment_status
    });

    await transaction.save();

    await Order.findByIdAndUpdate(orderId, { paymentStatus: 'Completed', transaction:transaction._id });
    
    // console.log("Creating order", session);
  }
  
  

router.post('/webhook', bodyParser.raw({type: 'application/json'}),(request, response) => {
    const payload = request.body;
    const sig = request.headers['stripe-signature'];
    
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    
    
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        

            createOrder(session)

            

            break;
  
        break;
      }
  
      
    }
  
    response.status(200).end();
  });

