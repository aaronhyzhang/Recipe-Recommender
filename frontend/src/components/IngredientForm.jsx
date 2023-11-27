import { useState } from "react";
import { useDispatch } from "react-redux";
import { createIngredient } from "../features/ingredients/ingredientSlice";

function IngredientForm() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createIngredient({ name, quantity }));
    setName("");
    setQuantity("");
  };

  return (
    <section className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Ingredient</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Ingredient Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-600"
          >
            Quantity
          </label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            Add Ingredient
          </button>
        </div>
      </form>
    </section>
  );
}

export default IngredientForm;
