"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3015;
app.get('/search', (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            res.status(400).json({ error: 'Missing query parameter' });
            return;
        }
        const booksDataPath = path_1.default.join(__dirname, '..', 'books.json');
        const books = JSON.parse(fs_1.default.readFileSync(booksDataPath, 'utf-8'));
        const matchedBooks = books.filter((book) => book.name.toLowerCase().startsWith(query.toLowerCase()));
        res.json(matchedBooks);
    }
    catch (error) { // Explicitly typing the 'error' object as 'Error'
        console.error('Error:', error);
        res.status(500).json({ error: error.message || 'An error occurred' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
