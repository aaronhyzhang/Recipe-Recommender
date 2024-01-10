import React from "react";

function RecipeList({ recipes }) {
  return (
    <div className="mt-6">
      {recipes.length > 0 ? (
        <div className="space-y-4">
          {recipes.map((recipe, index) => (
            <div key={index} className="p-4 bg-white rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2">Recipe</h3>
              <p>{recipe}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-center">
          No recipes available. Please generate using your ingredients.
        </p>
      )}
    </div>
  );
}

export default RecipeList;
