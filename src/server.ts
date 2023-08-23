import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3015;

app.get('/search', (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;
    if (!query) {
      res.status(400).json({ error: 'Missing query parameter' });
      return;
    }

    const booksDataPath = path.join(__dirname, '..', 'books.json');
    const books: any[] = JSON.parse(fs.readFileSync(booksDataPath, 'utf-8'));

    const matchedBooks = books.filter((book) =>
      book.name.toLowerCase().startsWith(query.toLowerCase())
    );

    res.json(matchedBooks);
  } catch (error: any) { // Explicitly typing the 'error' object as 'Error'
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
