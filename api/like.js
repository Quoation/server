const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res) => {
  const client = new MongoClient(process.env.DB_URI);

  try {
    client.connect();

    const db = client.db("Quotadata");
    const likes = await db
      .collection("quotadata")
      .find({ _id: ObjectId(req.query.id) })
      .toArray();

    const islikeed = likes[0].likes.includes(req.query.email);

    let newlikes;
    if (islikeed) {
      newlikes = likes[0].likes.filter((like) => like !== req.query.email);
    } else {
      newlikes = likes[0].likes.push(req.query.email);
    }

    await db
      .collection("quotadata")
      .updateOne({ _id: ObjectId(req.query.id) }, { $pull: { likes: null } });

    const collection = await db
      .collection("quotadata")
      .updateOne(
        { _id: ObjectId(req.query.id) },
        { $push: { likes: newlikes } }
      );

    res.json({
      status: 200,
      message: "Set data has successfully",
      data: collection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
