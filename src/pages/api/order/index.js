// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDataBase, insertDocument } from "@/utils/db-utils";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  let client = null;
  try {
    client = await connectDataBase();
  } catch (err) {
    res.status(500).json({ msg: "unable to connect to db" });
    return;
  }

  if (req.method === "POST") {
    try {
      const body = req.body;
      console.log(`body`, body);
      console.log(`req.cookies.userId`, req.cookies.userId);
      if (!req.cookies.userId || req.cookies.userId === "deleted") {
        res.status(500).json({ msg: "Unauthorized user" });
      }
      body.userId = req.cookies.userId;
      body.orderId = nanoid(5);
      const order = await insertDocument(client, "orders", { ...body });
      res.status(200).json({ order, orderId: body.orderId });
    } catch (err) {
      console.log("err :>> ", err);
      res.status(500).json({ msg: "unable to insert data", err: err.message });
    }
  }

  client.close();
}
