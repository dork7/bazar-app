// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDataBase, getUserData } from "@/utils/db-utils";

export default async function handler(req, res) {
  let client = null;
  try {
    client = await connectDataBase();
  } catch (err) {
    res.status(500).json({ msg: "unable to connect to db" });
    return;
  }

  if (req.method === "GET") {
    const { userId } = req.query;
    try {
      const user = await getUserData(client, "users", userId);
      res.status(200).json(user);
    } catch (err) {
      console.log(`err`, err);
      res.status(500).json({ msg: "unable to fetch data" });
    }
  }

  client.close();
  // res.status(200).json({ result });
}
