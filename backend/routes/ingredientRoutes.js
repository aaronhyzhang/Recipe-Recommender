const express = require("express");
const router = express.Router();
const {
  getIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
  generateRecipes,
} = require("../controllers/ingredientController");

const { protect } = require("../middleware/authMiddleware");

const app = express();
app.use(express.json());

router.route("/").get(protect, getIngredients).post(protect, addIngredient);
router
  .route("/:id")
  .put(protect, updateIngredient)
  .delete(protect, deleteIngredient);

router.route("/generate").post(protect, generateRecipes);

module.exports = router;
