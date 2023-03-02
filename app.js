import express from "express";
import mongoose from "mongoose";
const app = express();
import router from "./routes/user-routes.js";
app.use(express.json());
app.use("/api/user", router);

mongoose
  .connect(
    "mongodb+srv://varun:varanasi@cluster0.aepx7wm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("connected to db at locah host 5000"))
  .catch((err) => console.log(err));
