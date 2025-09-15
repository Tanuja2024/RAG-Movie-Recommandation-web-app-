// server.js
import express from 'express';
import cors from 'cors';
import { runRAGPipeline } from './rag.js'; 

const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommend', async (req, res) => {
  const { query } = req.body;
  try {
    const result = await runRAGPipeline(query);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("✅ Backend running at http://localhost:3000");
});
