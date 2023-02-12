import { MongoClient, ObjectId } from "mongodb";

export async function connectDataBase() {
  const dbString = process?.env.connectionString;
  return await MongoClient.connect(dbString);
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
}

export async function getDocuments(client, collection, query) {
  const db = client.db();
  return await db
    .collection(collection)
    .find({ ...query })
    .sort({ _id: -1 })
    .toArray();
}

export async function getStaticProductIds(client, collection, query) {
  const db = client.db();
  return await db
    .collection(collection)
    .find({ ...query }, { productId: 1, _id: 1 })
    .sort({ _id: -1 })
    .toArray();
}
export async function getUserData(client, collection, objId) {
  const db = client.db();
  var o_id = new ObjectId(objId);
  return await db
    .collection(collection)
    .find({ _id: o_id })
    .sort({ _id: -1 })
    .toArray();
}
