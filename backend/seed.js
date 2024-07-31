// seed.js
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
async function seed() {
  
  const url =
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI_ATLAS
      : process.env.MONGODB_URI_LOCAL;
  const dbName = 'Inventory-M-S';
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to database');
    const db = client.db(dbName);

    
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = {
      name: 'EV Shop Owner',
      email: 'owner@evshop.com',
      password: hashedPassword,
    };

    const insertedUser = await db.collection('users').insertOne(user);
    console.log('User inserted');

    // Create 10 consumers
    const consumers = Array.from({ length: 10 }).map((_, i) => ({
      user: insertedUser.insertedId,
      name: `Consumer ${i + 1}`,
      email: `consumer${i + 1}@example.com`,
      mobile: `12345678${i + 1}`,
      dob: new Date(1990, i, i + 1),
      address: `123 Street ${i + 1}, City, Country`,
      isActive: true,
    }));

    const insertedConsumers = await db.collection('consumers').insertMany(consumers);
    console.log('Consumers inserted');

   
    const items = Array.from({ length: 10 }).map((_, i) => ({
      user: insertedUser.insertedId,
      item_name: `Electric Vehicle ${i + 1}`,
      Quantity: 10 + i * 2,
      About: `Description of Electric Vehicle ${i + 1}`,
      inStock: true,
      price: (10000 + i * 1000),
    }));

    const insertedItems = await db.collection('items').insertMany(items);
    console.log('Items inserted');

    
    const transactions = Array.from({ length: 20 }).map((_, i) => ({
        sessionId: uuidv4(),  
        amount: 50000,  
        currency: 'USD',
        paymentStatus: 'Completed',  
        createdAt: new Date(),
        user: insertedUser.insertedId,
      }));
  
      const insertedTransactions = await db.collection('transactions').insertMany(transactions);
      console.log('Transactions inserted');
  
      
      const paymentStatuses = ['Pending', 'Completed', 'Failed'];
      const orders = Array.from({ length: 20 }).map((_, i) => ({
        user: insertedUser.insertedId,
        consumer: insertedConsumers.insertedIds[i % 10],
        Items: [insertedItems.insertedIds[i % 10]],
        isActive: true,
        paymentStatus: paymentStatuses[i % 3],  
        transaction: insertedTransactions.insertedIds[i] 
      }));
  
      await db.collection('orders').insertMany(orders);
      console.log('Orders inserted');

  } finally {
    await client.close();
  }
}

seed().catch(console.error);
