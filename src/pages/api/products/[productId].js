import { connectDataBase, getDocuments } from '@/utils/db-utils';

export default async function handler(req, res) {
  let client = null;
  try {
    client = await connectDataBase();
  } catch (err) {
    res.status(500).json({ msg: 'unable to connect to db' });
    return;
  }

  if (req.method === 'GET') {
    const { productId } = req.query;
    try {
      const products = await getDocuments(client, 'products', { productId });
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ msg: 'unable to fetch data' });
    }
  }
  client.close();
}
