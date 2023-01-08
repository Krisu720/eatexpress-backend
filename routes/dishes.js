const router = require("express").Router();
const dish = require("../models/dish");
const section = require("../models/section");
router.get("/", async (req, res) => {
  const dishes = await dish.where();
  res.json(dishes);
});

router.get("/:id", async (req, res) => {
  const dishes = await dish.findById(req.params.id);
  res.json(dishes);
});

router.post("/:id", async (req, res) => {
  const dishes = await dish.create(req.body);
  const newDishId = dishes._id;
  const xd = await section.findByIdAndUpdate(req.params.id, {
    $push: { dishes: newDishId },
  });
  res.json(dishes);
});

router.put("/:id", async (req, res) => {
  const dishes = await dish.findByIdAndUpdate(req.params.id, req.body);
  res.json(dishes);
});

router.delete("/:id", async (req, res) => {
  const dishes = await dish.findByIdAndDelete(req.params.id);
  const newDishId = dishes._id;
  const xd = await section.findByIdAndUpdate(req.body.sectionId, {
    $pull: { dishes: newDishId },
  });
  res.json(xd);
});

module.exports = router;
