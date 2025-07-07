import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;  // url of uploaded image from client

  if (!url) {
    return res.status(400).json({ error: 'Missing image URL' });
  }

  const filePath = path.join(process.cwd(), 'data', 'images.json');

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const images = JSON.parse(jsonData);

    if (!Array.isArray(images)) {
      return res.status(500).json({ error: 'Data format invalid' });
    }

    images.unshift(url); // add new image at the front

    fs.writeFileSync(filePath, JSON.stringify(images, null, 2));

    res.status(200).json({ message: 'Image added', images });
  } catch (error) {
    console.error('Error updating images:', error);
    res.status(500).json({ error: 'Failed to update images' });
  }
}