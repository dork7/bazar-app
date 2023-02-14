// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDataBase, getStaticProductIds } from "@/utils/db-utils";

export default async function handler(req, res) {
  let client = null;
  try {
    client = await connectDataBase();
  } catch (err) {
    res.status(500).json({ msg: "unable to connect to db" });
    return;
  }

  if (req.method === "GET") {
    try {
      const productIds = await getStaticProductIds(client, "products", {
        genStaticPages: "true",
      });
      if (!productIds) {
        console.log("NO productIDs");
        res.status(200).json({ msg: "NO productIDs" });
      }
      const ids = productIds.flatMap((item) => {
        return {
          params: {
            productId: item.productId,
          },
        };
      });
      res.status(200).json({ productIds: ids });
    } catch (err) {
      console.log("err :>> ", err);
      res.status(500).json({ msg: "unable to fetch data" });
    }
  }

  client.close();
}
