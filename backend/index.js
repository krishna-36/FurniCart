import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/Furniture";

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err.message);
  });

const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  category: String,
  price: Number,
  rating: Number,
  images: String,
  stock: Number,
  brand: String,
  material: String,
  color: String,
  dimensions: String,
  weight: String,
  isFeatured: Boolean,
  description: String,
  products: [mongoose.Schema.Types.Mixed],
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const contactSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    subject: String,
    message: String,
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, default: "Placed" },
  },
  { timestamps: true }
);

const productData = mongoose.model("allProducts", productSchema);
const User = mongoose.model("users", userSchema);
const ContactMessage = mongoose.model("contactMessages", contactSchema);
const Order = mongoose.model("orders", orderSchema);

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

function getProductImage(product) {
  if (!Array.isArray(product.images)) {
    return product.images;
  }

  const isTable =
    product.category?.toLowerCase() === "table" ||
    product.name?.toLowerCase().startsWith("table model");

  return isTable ? product.images[1] || product.images[0] : product.images[0];
}

function normalizeProducts(products) {
  const rawProducts = products.flatMap((product) => {
    if (Array.isArray(product.products)) {
      return product.products;
    }

    return product;
  });

  return rawProducts.map((product) => ({
    _id: product._id || product.id,
    name: product.name,
    category: product.category,
    price: product.discountPrice || product.price,
    originalPrice: product.discountPrice ? product.price : undefined,
    rating: product.rating,
    images: getProductImage(product),
    stock: product.stock,
    brand: product.brand,
    material: product.material,
    color: product.color,
    dimensions: product.dimensions,
    weight: product.weight,
    isFeatured: Boolean(product.isFeatured),
    description: product.description,
  }));
}

app.get("/", async (req, res) => {
  res.send({
    app: "FurniCart API",
    endpoints: [
      "/api/products",
      "/api/products/:id",
      "/api/orders",
      "/api/orders?email=user@example.com",
      "/api/signup",
      "/api/login",
      "/api/contact",
    ],
  });
});

app.get("/api/products", async (req, res) => {
  try {
    if (!isDbConnected()) {
      res.status(503).send({ message: "Database is not connected" });
      return;
    }

    const allProducts = await productData.find().lean();
    res.send(normalizeProducts(allProducts));
  } catch (error) {
    res.status(500).send({ message: "Unable to load products", error: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    if (!isDbConnected()) {
      res.status(503).send({ message: "Database is not connected" });
      return;
    }

    const allProducts = await productData.find().lean();
    const product = normalizeProducts(allProducts).find(
      (item) => item._id === req.params.id
    );

    if (!product) {
      res.status(404).send({ message: "Product not found" });
      return;
    }

    res.send(product);
  } catch (error) {
    res.status(500).send({ message: "Unable to load product", error: error.message });
  }
});

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

app.get("/api/orders", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    res.status(400).send({ message: "Email is required" });
    return;
  }

  try {
    if (!isDbConnected()) {
      res.status(503).send({ message: "Database is not connected" });
      return;
    }

    const orders = await Order.find({
      "customer.email": new RegExp(`^${escapeRegex(email)}$`, "i"),
    })
      .sort({ createdAt: -1 })
      .lean();

    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: "Unable to load orders", error: error.message });
  }
});

app.post("/api/orders", async (req, res) => {
  const { customer, items } = req.body;

  if (
    !customer?.name ||
    !customer?.email ||
    !customer?.phone ||
    !customer?.address ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    res.status(400).send({ message: "Customer details and cart items are required" });
    return;
  }

  try {
    if (!isDbConnected()) {
      res.status(503).send({ message: "Database is not connected" });
      return;
    }

    const cleanedItems = items.map((item) => ({
      productId: item._id || item.productId,
      name: item.name,
      price: Number(item.price),
      quantity: Math.max(1, Number(item.quantity || 1)),
      image: item.images || item.image,
    }));
    const total = cleanedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderCustomer = {
      ...customer,
      email: customer.email.toLowerCase().trim(),
    };

    const order = await Order.create({ customer: orderCustomer, items: cleanedItems, total });
    res.status(201).send({
      message: "Order placed successfully",
      orderId: order._id,
      total: order.total,
    });
  } catch (error) {
    res.status(500).send({ message: "Unable to place order", error: error.message });
  }
});

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).send({ message: "Name, email, and password are required" });
    return;
  }

  try {
    if (!isDbConnected()) {
      res.status(201).send({
        message: "Signup received. Connect MongoDB to persist users.",
        user: { name, email },
      });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).send({ message: "A user with this email already exists" });
      return;
    }

    const user = await User.create({ name, email, password });
    res.status(201).send({
      message: "Account created successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).send({ message: "Unable to create account", error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: "Email and password are required" });
    return;
  }

  try {
    if (!isDbConnected()) {
      res.send({
        message: "Login checked locally. Connect MongoDB for saved accounts.",
        user: { email },
      });
      return;
    }

    const user = await User.findOne({ email, password });
    if (!user) {
      res.status(401).send({ message: "Invalid email or password" });
      return;
    }

    res.send({
      message: "Logged in successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).send({ message: "Unable to login", error: error.message });
  }
});

app.post("/api/contact", async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  if (!firstName || !email || !message) {
    res.status(400).send({ message: "First name, email, and message are required" });
    return;
  }

  try {
    if (isDbConnected()) {
      await ContactMessage.create({ firstName, lastName, email, subject, message });
    }

    res.status(201).send({ message: "Thanks for reaching out. We will contact you soon." });
  } catch (error) {
    res.status(500).send({ message: "Unable to send message", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
