const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res) => {
  const client = new MongoClient(process.env.DB_URI);

  try {
    client.connect();

    const db = client.db("Quotadata");
    const collection = await db.collection("quotadata").aggregate().toArray();

    const quotes = collection.slice(
      Number(req.query.start),
      Number(req.query.start) + 10
    );

    res.json({
      status: 200,
      message: "Get data has successfully",
      data: quotes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
