import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'data', 'images.json');

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const images = JSON.parse(jsonData);

    // Ensure images is an array before returning
    if (!Array.isArray(images)) {
      return res.status(500).json({ error: 'Data format invalid' });
    }

    res.status(200).json(images);  // <-- RETURN ARRAY DIRECTLY
  } catch (error) {
    console.error('Failed to read images:', error);
    res.status(500).json({ error: 'Failed to load images' });
  }
}