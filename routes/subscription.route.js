
const subscription = require("../controllers/subscription.controller");
const express = require("express");
const router = express.Router();
// Create New subscription
router.post("/create", subscription.create);
// // Retrieve all subscriptions
router.get("/all", subscription.getAllSubscriptions);
// Retrieve all Published subscriptions by Publisher Name
router.get("/email/:email", subscription.getSubscriptionByEmail);
// Retrieve subscription by ID
router.get("/:id", subscription.getSubscriptionByID);
// // Update subscription by ID
router.put("/update/:id", subscription.updateSubscriptionByID);
// // Delete subscription by ID
router.delete("/delete/:id", subscription.deleteSubscriptionByID);

module.exports = router;
