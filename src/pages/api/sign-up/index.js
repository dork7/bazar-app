// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import formidable from 'formidable';
import path from 'path';

import {
  connectDataBase,
  getDocuments,
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

  if (req.method === 'POST') {
    const body = req.body;

    try {
      await insertDocument(client, 'users', { ...body });
      res.status(200).json({ msg: 'Sign up success' });
    } catch (err) {
      console.log('err :>> ', err);
      res.status(500).json({ msg: 'unable to insert data' });
    }
  }

  client.close();
  // res.status(200).json({ result });
}
