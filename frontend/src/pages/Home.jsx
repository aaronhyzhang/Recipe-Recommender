import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl text-white font-semibold mb-4">
          Welcome to the Aaron's Recipe Recommender
        </h1>
        <p className="text-lg text-white mb-8">
          Get your customized recipes today!
        </p>
        <Link to="/register">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300">
            Sign Up Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
