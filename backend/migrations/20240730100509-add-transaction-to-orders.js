
module.exports = {
  async up(db, client) {
    
    await db.collection('orders').updateMany(
      {},
      { $set: { transaction: null } }
    );
  },

  async down(db, client) {
    
    await db.collection('orders').updateMany(
      {},
      { $unset: { transaction: '' } }
    );
  }
};
