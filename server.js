// const path = require("path");
// const express = require("express");
// const colors = require("colors");
// const dotenv = require("dotenv").config();
// const { errorHandler } = require("./backend/middleware/errorMiddleware");
// const connectDB = require("./backend/config/db");
// const port = process.env.PORT || 5500;

// connectDB();

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use("/api/ingredients", require("./backend/routes/ingredientRoutes"));
// app.use("/api/users", require("./backend/routes/userRoutes"));

// // Serve frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "build", "index.html")
//     )
//   );
// } else {
//   app.get("/", (req, res) => res.send("Please set to production"));
// }

// app.use(errorHandler);

// app.listen(port, () => console.log(`Server started on port ${port}`));

const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./backend/middleware/errorMiddleware");
const connectDB = require("./backend/config/db");
const port = process.env.PORT || 5500;

const startServer = async () => {
  try {
    await connectDB();
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use("/api/ingredients", require("./backend/routes/ingredientRoutes"));
    app.use("/api/users", require("./backend/routes/userRoutes"));

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../frontend/build")));

      app.get("*", (req, res) =>
        res.sendFile(
          path.resolve(__dirname, "../", "frontend", "build", "index.html")
        )
      );
    } else {
      app.get("/", (req, res) => res.send("Please set to production"));
    }

    app.use(errorHandler);

    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
