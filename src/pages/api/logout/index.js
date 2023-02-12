// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "POST") {
    console.log("logginout");
    res.setHeader("Set-Cookie", "userId=deleted;  ");
    res.send({});
  } else {
    throw new NotFoundError();
  }
}
