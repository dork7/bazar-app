import { connectDataBase, getDocuments } from '@/utils/db-utils';

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export default async function handler(req, res) {
  let client = null;
  try {
    client = await connectDataBase();
  } catch (err) {
    res.status(500).json({ msg: 'unable to connect to db' });
    return;
  }

  if (req.method === 'GET') {
    const { queryString } = req.query;
    console.log('queryString :>> ', queryString);
    // try {
    //   const products = await getDocuments(client, 'products', { productId });
    //   res.status(200).json(products);
    // } catch (err) {
    //   res.status(500).json({ msg: 'unable to fetch data' });
    // }
    const regex = new RegExp(escapeRegex(queryString), 'gi');
    console.log('regex :>> ', regex);
    const db = client.db();

    // db.collection('products').find({ name: regex }, function (err, foundjobs) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('object :>> ', foundjobs);
    //     res.status(200).json('products');
    //   }
    // });

    const reuslt = await db
      .collection('products')
      .find({ $text: { $search: 'Mehvish' } })
      .toArray();
    console.log('res :>> ', reuslt);
    res.status(200).json('products');
  }
  client.close();
}
