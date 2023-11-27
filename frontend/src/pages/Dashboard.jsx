import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import IngredientForm from "../components/IngredientForm";
import IngredientItem from "../components/IngredientItem.jsx";
import Spinner from "../components/Spinner";
import { getIngredients, reset } from "../features/ingredients/ingredientSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { ingredients, isLoading, isError, message } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getIngredients());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold">
            Welcome {user && user.name}
          </h1>
          <p>Ingredients Dashboard</p>
        </div>
      </header>

      <main className="container mx-auto mt-8">
        <IngredientForm />

        <section className="mt-8">
          {ingredients.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {ingredients.map((ingredient) => (
                <IngredientItem key={ingredient._id} ingredient={ingredient} />
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-600">
              You have not added any ingredients.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
