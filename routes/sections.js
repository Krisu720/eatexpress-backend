const router = require("express").Router();
const section = require('../models/section')
const restaurant = require('../models/restaurant')

router.get("/", async (req, res) => {
    const sections = await section.find().populate('dishes');
    res.json(sections);
});

router.post("/", async (req, res) => {
    const sections = await section.create(req.body);
    const newSectionId = sections._id;
    const xd = await restaurant.findByIdAndUpdate(req.body.restaurantId, { $push: { products: newSectionId } });
    res.json(sections._id);
});

router.put("/:id", async (req, res) => {
    const sections = await section.findByIdAndUpdate(req.params.id,req.body);
    res.json(sections);
});

router.delete("/:restaurantId/:id", async (req, res) => {
    const sections = await section.findByIdAndDelete(req.params.id);
    const newSectionId = sections._id
    const xd = await restaurant.findByIdAndUpdate(req.params.restaurantId, { $pull: { products: newSectionId } });
    res.json(xd);
});

module.exports = router;