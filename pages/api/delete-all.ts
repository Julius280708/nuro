// pages/api/delete-all.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const filePath = path.join(process.cwd(), 'data', 'images.json');

  try {
    fs.writeFileSync(filePath, '[]', 'utf-8');
    res.status(200).json({ message: 'All images deleted', images: [] });
  } catch (error) {
    console.error('Error clearing images:', error);
    res.status(500).json({ error: 'Failed to clear images' });
  }
}