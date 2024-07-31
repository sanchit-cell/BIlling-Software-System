
module.exports = {
  async up(db, client) {
    
    await db.collection('transactions').updateMany(
      {},
      { $set: { user: null } }
    );
  },

  async down(db, client) {
    
    await db.collection('transactions').updateMany(
      {},
      { $unset: { user: '' } }
    );
  }
};
