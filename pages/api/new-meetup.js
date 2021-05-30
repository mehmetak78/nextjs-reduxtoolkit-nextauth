// /api/new-meetup
// ONLY the POST requests

import {MongoClient} from 'mongodb';

import keys from "../../config/keys";

const handler = async (req, res) => {

  if (req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect(keys.mongoURI)
    const db = client.db();
    const meetupCollections = db.collection('meetups');
    const result = await meetupCollections.insertOne(data);
    console.log(result)
    await client.close();
    res.status(201).json({message: 'Meetup Inserted'})
  }
}

export default handler;


