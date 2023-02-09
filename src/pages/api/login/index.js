// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import formidable from 'formidable';
import path from 'path';

import {
  connectDataBase,
  getDocuments,
  insertDocument,
} from '@/utils/db-utils';

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
      const { email } = body;
      const user = await getDocuments(client, 'users', { email });
      if (user.length < 1) {
        return res.status(500).json({ message: 'No such user' });
      }
      if (user[0].password !== body.password) {
        return res.status(500).json({ message: 'Incorrect Password' });
      }

      res.status(200).json({ msg: 'Sign up success' });
    } catch (err) {
      console.log('err :>> ', err);
      res.status(500).json({ msg: 'unable to insert data' });
    }
  }

  client.close();
  // res.status(200).json({ result });
}
