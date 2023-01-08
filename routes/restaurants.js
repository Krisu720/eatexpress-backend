const router = require("express").Router();

const restaurant = require("../models/restaurant");

router.get("/", async (req, res) => {
  const restaurants = await restaurant.find().populate({
    path: "products",
    populate: { path: "dishes" },
  });
  res.json(restaurants);
});

router.get("/:id", async (req, res) => {
  const restaurants = await restaurant.findById(req.params.id).populate({
    path: "products",
    populate: { path: "dishes" },
  });
  res.json(restaurants);
});

router.post("/", async (req, res) => {
  const restaurants = await restaurant.create(req.body);
  res.json(restaurants);
});

router.put("/:id", async (req, res) => {
  const restaurants = await restaurant.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.json(restaurants);
});

router.delete("/:id", async (req, res) => {
  const restaurants = await restaurant.findByIdAndDelete(req.params.id);
  res.json(restaurants);
});

module.exports = router;
