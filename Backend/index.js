
import dotenv from "dotenv";
dotenv.config();  


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import contactRoute from "./routes/contactRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use("/contacts", contactRoute);

// 👉 Serve frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "Frontend/dist/index.html")
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
