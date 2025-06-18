// importing express router from express
const express=require('express')
const router=express.Router()
const MenuItem = require("../models/MenuItem");

// POST route to add menu items
router.post("/", async (req, res) => {
  try {
    const itemData = req.body;
    const newItem = new MenuItem(itemData);

    const response = await newItem.save();
    console.log("new menu item saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to show all menu items
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetchd from menu");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; //extract the tasteType(parameter) from url
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log(
        "response fetched based taste either sweet, spicy,sour"
      );
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports=router