const express = require("express");
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 3003;
const HOST = '0.0.0.0';

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
    res.json({ message: "Hola desde el servidor!" });
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});