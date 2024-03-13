const express = require('express');
const app = express();
const port = 3000;
const db = require('./fakeDb')

app.use(express.json());

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body; 
    items.push(newItem);
    res.status(201).json({ added: newItem });
});

app.get('/items/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
});

app.patch('/items/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }
    if (req.body.name) item.name = req.body.name;
    if (req.body.price) item.price = req.body.price;
    res.json({ updated: item });
});

app.delete('/items/:name', (req, res) => {
    const index = items.findIndex(i => i.name === req.params.name);
    if (index === -1) {
        return res.status(404).json({ error: "Item not found" });
    }
    const deleted = items.splice(index, 1);
    res.json({ deleted: deleted[0] });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});