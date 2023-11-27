const express = require("express");
const router = express.Router();
const {
  getIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
} = require("../controllers/ingredientController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getIngredients).post(protect, addIngredient);
router
  .route("/:id")
  .put(protect, updateIngredient)
  .delete(protect, deleteIngredient);

module.exports = router;
