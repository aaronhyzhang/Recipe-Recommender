import { useDispatch } from "react-redux";
import { deleteIngredient } from "../features/ingredients/ingredientSlice";

function IngredientItem({ ingredient }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-4">
      <div className="text-gray-500 mb-2">
        {new Date(ingredient.createdAt).toLocaleString("en-US")}
      </div>
      <h2 className="text-xl font-semibold mb-2">{ingredient.name}</h2>
      <p className="text-gray-600 mb-4">{ingredient.quantity}</p>
      <button
        onClick={() => dispatch(deleteIngredient(ingredient._id))}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
      >
        Remove
      </button>
    </div>
  );
}

export default IngredientItem;
