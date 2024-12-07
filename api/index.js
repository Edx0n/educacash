const { mongoose } = require("mongoose");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const Transaction = require("./models/Transaction.js");
const User = require("./models/User");

const app = express();
const port = 4040;

app.use(cors());
app.use(express.json());

//Testes das Requisições
app.get("/api/test", (req, res) => {
  res.json({ body: "Text ok" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//Post da Transação
app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);

  const { name, price, description, datetime, userId } = req.body;

  const transaction = await Transaction.create({
    name,
    price,
    description,
    datetime,
    userId,
  });
  res.json(transaction);
});

//Get da Transação
app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);

  const transactions = await Transaction.find();
  res.json(transactions);
});

// Post do Registro
app.post("/api/register", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);

  const { userName, passWord } = req.body;
  try {
    const userDoc = await User.create({
      userName,
      passWord, // Armazenando a senha diretamente (não recomendado para produção)
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

//Post do Login
app.post("/api/login", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);

  const { userName, passWord } = req.body;
  const userDoc = await User.findOne({ userName });

  if (!userDoc) {
    return res.status(400).json("Usuário não encontrado!");
  }

  if (userDoc.passWord === passWord) {
    res.json({
      id: userDoc._id,
      userName,
    });
  } else {
    res.status(400).json("Credenciais inválidas!");
  }
});

// Logout
app.post("/logout", (req, res) => {
  res.cookie("token", "", { maxAge: 1 }).json("ok");
});
