// pages/api/images.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const filePath = path.join(process.cwd(), 'data', 'images.json');

  try {
    const jsonData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '[]';
    const images = JSON.parse(jsonData);

    if (!Array.isArray(images)) {
      return res.status(500).json({ error: 'Invalid image data format' });
    }

    res.status(200).json(images);
  } catch (error) {
    console.error('Error reading images:', error);
    res.status(500).json({ error: 'Failed to load images' });
  }
}