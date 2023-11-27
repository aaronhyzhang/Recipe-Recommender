const asyncHandler = require("express-async-handler");

const Ingredient = require("../models/ingredientModel");
const User = require("../models/userModel");

// @desc    Get ingredients
// @route   GET /api/ingredients
// @access  Private
const getIngredients = asyncHandler(async (req, res) => {
  const ingredients = await Ingredient.find({ user: req.user.id });

  res.status(200).json(ingredients);
});

// @desc    Add ingredient
// @route   POST /api/ingredients
// @access  Private
const addIngredient = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.quantity) {
    res.status(400);
    throw new Error("Please provide both name and quantity for the ingredient");
  }

  const ingredient = await Ingredient.create({
    name: req.body.name,
    quantity: req.body.quantity,
    user: req.user.id,
  });

  res.status(200).json(ingredient);
});

// @desc    Update ingredient
// @route   PUT /api/ingredients/:id
// @access  Private
const updateIngredient = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);

  if (!ingredient) {
    res.status(400);
    throw new Error("Ingredient not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the ingredient user
  if (ingredient.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedIngredient = await Ingredient.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedIngredient);
});

// @desc    Delete ingredient
// @route   DELETE /api/ingredients/:id
// @access  Private
const deleteIngredient = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);

  if (!ingredient) {
    res.status(400);
    throw new Error("Ingredient not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the ingredient user
  if (ingredient.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await ingredient.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
};
