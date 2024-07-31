
module.exports = {
  async up(db, client) {
    
    await db.collection('consumers').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ email: 1 }, { unique: true });

   
  },

  async down(db, client) {
    
    await db.collection('consumers').dropIndex('email_1');
    await db.collection('users').dropIndex('email_1');

    
  }
};
