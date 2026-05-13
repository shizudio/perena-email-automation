require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);

async function getVipUsers() {
  await client.connect();
  const docs = await client.db('perena').collection('vipusers').find({}).toArray();
  await client.close();
  return docs.map(doc => ({
    _id: doc._id.toString(),
    name: doc.displayName || '',
    email: doc.email || '',
    status: doc.status || '',
    tier: doc.tier || '',
    lastBalance: doc.lastBalance ?? null,
    createdAt: doc.createdAt ? new Date(doc.createdAt) : null,
  }));
}

module.exports = { getVipUsers };
