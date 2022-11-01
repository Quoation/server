const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res) => {
  const client = new MongoClient(process.env.DB_URI);

  try {
    client.connect();

    const db = client.db("Quotadata");
    const collection = await db
      .collection("users")
      .find({ email: req.query.email, password: req.query.password })
      .toArray();

    res.json({
      status: 200,
      message: "Get data has successfully",
      data: collection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
