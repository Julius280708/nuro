// pages/api/upload.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, name, usertag, date } = req.body;

  if (!url || !name || !usertag || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const filePath = path.join(process.cwd(), 'data', 'images.json');

  try {
    const jsonData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '[]';
    const images = JSON.parse(jsonData);

    const newImage = { url, name, usertag, date };
    images.unshift(newImage); // Add image to beginning of array

    fs.writeFileSync(filePath, JSON.stringify(images, null, 2));

    res.status(200).json(newImage); // Return only the new image object
  } catch (error) {
    console.error('Error updating images:', error);
    res.status(500).json({ error: 'Failed to update images' });
  }
}