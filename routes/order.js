const router = require("express").Router();
const order = require("../models/order");

router.get("/", async (req, res) => {
  const orders = await order.where();
  res.json(orders);
});

router.get("/:userId", async (req, res) => {
  const orders = await order.where({
    userId: req.params.userId,
  });
  res.json(orders);
});

router.post("/", async (req, res) => {
  const orders = await order.create({
    ...req.body,
  });
  res.json(orders);
});

module.exports = router;
