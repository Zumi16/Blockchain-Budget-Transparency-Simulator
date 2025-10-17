import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = "./blockchain.json";

function getBlocks() {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH, "utf8");
  return data ? JSON.parse(data) : [];
}

function saveBlocks(blocks) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(blocks, null, 2));
}

app.get("/getBlocks", (req, res) => {
  const blocks = getBlocks();
  res.json(blocks);
});

app.post("/addBlock", (req, res) => {
  const { projectName, budgetAmount, transactions, totalSpent, remaining, status } = req.body;
  const blocks = getBlocks();

  const newBlock = {
    id: blocks.length + 1,
    projectName,
    budgetAmount,
    transactions,
    totalSpent,
    remaining,
    status,
    votes: { reallocate: 0, return: 0 },
    timestamp: new Date().toISOString()
  };

  blocks.push(newBlock);
  saveBlocks(blocks);
  res.json({ message: "Block added successfully!", block: newBlock });
});

app.post("/vote", (req, res) => {
  const { id, type } = req.body;
  const blocks = getBlocks();
  const block = blocks.find(b => b.id === id);

  if (block) {
    block.votes[type]++;
    saveBlocks(blocks);
    res.json({ message: "Vote recorded!", block });
  } else {
    res.status(404).json({ message: "Block not found" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
