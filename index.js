import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";

const port = 5002;
const app = express();

app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.listen(port, () => {
  console.log("====================================");
  console.log("server run port ==", port);
  console.log("====================================");
});
