// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import formidable from "formidable";
import path from "path";

import {
  connectDataBase,
  getDocuments,
  insertDocument,
} from "@/utils/db-utils";
import { matchPassword } from "@/utils/auth";

export default async function handler(req, res) {
  let client = null;
  try {
    client = await connectDataBase();
  } catch (err) {
    res.status(500).json({ msg: "unable to connect to db" });
    return;
  }

  if (req.method === "POST") {
    const body = req.body;

    try {
      const { email } = body;
      const user = await getDocuments(client, "users", { email });
      if (user.length < 1) {
        client.close();
        return res.status(500).json({ message: "No such user" });
      }

      const isPassValid = await matchPassword(body.password, user[0].password);
      if (!isPassValid) {
        client.close();
        return res.status(500).json({ message: "Incorrect Password" });
      }
      // res.cookies.set("auth", "secret");
      res.setHeader(
        "set-cookie",
        `userId=${user[0]._id}; path=/; samesite=lax; httponly;`
      );

      res.status(200).json({ msg: "Sign up success", user: user[0] });
    } catch (err) {
      console.log("err :>> ", err);
      res.status(500).json({ msg: "unable to insert data" });
    }
  }

  client.close();
  // res.status(200).json({ result });
}
