import mongoose from "mongoose";
import express, { urlencoded } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(urlencoded());

mongoose
  .connect("mongodb://localhost:27017/Furniture")
  .then((ack) => {
    if (ack) {
      console.log("connected");
    }
  })
  .catch((err) => {
    console.log("error", err);
  });

const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  category: String,
  price: Number,
  rating: Number,
  images: String,
  stock: Number,
  isFeatured: String,
});

const productData = new mongoose.model("allProducts", productSchema);

app.get("/", async (req, res) => {
  const allProducts = await productData.find();
  res.send(allProducts);
});

app.listen(6000, () => {
  console.log("Server started at port no. 6000");
});
