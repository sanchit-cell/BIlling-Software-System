
module.exports = {
  async up(db, client) {
    await db.collection('orders').updateMany(
      {},
      { $set: { paymentStatus: 'Pending' } }
    );
  },

  async down(db, client) {
    await db.collection('orders').updateMany(
      {},
      { $unset: { paymentStatus: '' } }
    );
  }
};

