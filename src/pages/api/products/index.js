// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import formidable from 'formidable';
import path from 'path';

import {
  connectDataBase,
  getDocuments,
  insertDocument,
} from '@/utils/db-utils';
import { nanoid } from 'nanoid';

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req, saveLocally) => {
  const options = {};
  let fileName = '';

  if (saveLocally) {
    options.uploadDir = path.join(
      process.cwd(),
      '/public/assets/images/products'
    );
    options.filename = (name, ext, path, form) => {
      fileName = Date.now().toString() + '_' + path.originalFilename;
      return fileName;
    };
  }
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      // console.log('files :>> ', files);
      if (err) reject(err);

      resolve({ fields, files, fileName });
    });
  });
};

export default async function handler(req, res) {
  let client = null;
  try {
    client = await connectDataBase();
  } catch (err) {
    res.status(500).json({ msg: 'unable to connect to db' });
    return;
  }

  if (req.method === 'POST') {
    const result = await readFile(req, true);
    const body = result.fields;
    body.productId = nanoid(5);
    body.price = parseInt(body.price);
    body.imageURL = '/assets/images/products/' + result.fileName;
    // console.log('body.imageURL :>> ', body.imageURL);
    try {
      await insertDocument(client, 'products', { ...body });
    } catch (err) {
      console.log('err :>> ', err);
      res.status(500).json({ msg: 'unable to insert data' });
    }
    res.status(200).json({ msg: 'data written', result });
  } else if (req.method === 'GET') {
    console.log('req.method :>> ', req.method);
    try {
      const products = await getDocuments(client, 'products', {});
      console.log('products :>> ', products);
      res.status(200).json({ products });
    } catch (err) {
      res.status(500).json({ msg: 'unable to fetch data' });
    }
  }

  client.close();
  // res.status(200).json({ result });
}
