import { connectDataBase, getDocuments } from "@/utils/db-utils";

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export default async function handler(req, res) {
  let client = null;
  try {
    client = await connectDataBase();
  } catch (err) {
    res.status(500).json({ msg: "unable to connect to db" });
    return;
  }

  if (req.method === "GET") {
    const { queryString } = req.query;

    const db = client.db();

    const regexPattern = `.*${queryString}.*`; // the regular expression pattern
    const result = await db
      .collection("products")
      .find({
        name: { $regex: regexPattern, $options: "i" }, // case-insensitive search
      })
      .toArray();
    console.log(`result`, result);
    res.status(200).json(result);
  }
  client.close();
}
