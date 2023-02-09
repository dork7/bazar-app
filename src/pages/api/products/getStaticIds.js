// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import formidable from 'formidable';
import path from 'path';

import {
  connectDataBase,
  getDocuments,
  getStaticProductIds,
  insertDocument,
} from '@/utils/db-utils';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  let client = null;
  try {
    client = await connectDataBase();
  } catch (err) {
    res.status(500).json({ msg: 'unable to connect to db' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const productIds = await getStaticProductIds(client, 'products', {
        genStaticPages: true,
      });
      console.log('productIds :>> ', productIds);
      res.status(200).json({ productIds });
    } catch (err) {
      res.status(500).json({ msg: 'unable to fetch data' });
    }
  }

  client.close();
  // res.status(200).json({ result });
}
