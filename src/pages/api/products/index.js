// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import formidable from 'formidable';
import path from 'path';
export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req, saveLocally) => {
  const options = {};

  if (saveLocally) {
    options.uploadDir = path.join(
      process.cwd(),
      '/public/assets/images/products'
    );
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + '_' + path.originalFilename;
    };
  }

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req, res) {
  await readFile(req, true);
  res.status(200).json({ name: 'John Doe' });
}
