const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please provide the name of the ingredient"],
    },
    quantity: {
      type: String,
      required: [true, "Please specify the quantity of the ingredient"],
    },
    // Maybe add this later
    // category : {
    //   type: String,
    //   required: [true, "Please specify the category of the ingredient"],
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ingredient", ingredientSchema);
