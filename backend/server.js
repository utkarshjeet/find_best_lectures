import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from backend!");
});


app.post("/api/search", async (req, res) => {

    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: "Query required" });
    }

    try {

        const response = await fetch(
            "https://porn-xnxx-api.p.rapidapi.com/search",
            {
                method: "POST",
                headers: {
                    "x-rapidapi-key": process.env.RAPID_API_KEY,
                    "x-rapidapi-host": "porn-xnxx-api.p.rapidapi.com",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ q: query })
            }
        );

        const data = await response.json();

        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});