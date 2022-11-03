const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res) => {
  const client = new MongoClient(process.env.DB_URI);

  try {
    client.connect();

    const db = client.db("Quotadata");
    const collection = await db.collection("quotadata").insertOne({
      quote: req.query.quote,
      author: req.query.author,
      email: req.query.email,
      like: 0,
    });

    res.json({
      status: 200,
      message: "Set data has successfully",
      data: collection.acknowledged,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
