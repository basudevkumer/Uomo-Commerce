const mongoose = require("mongoose");
const User = require("../models/User.js");
const Product = require("../models/Product.js");
const Category = require("../models/Category.js");
const slugify = require("../utils/slugify.js");

const fail = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const validId = (id) => mongoose.isValidObjectId(id);

async function listUsers(req, res, next) {
  try {
    const users = await User.find()
      .select("-password -emailVerificationToken -passwordResetToken")
      .sort({ createdAt: -1 });
    res.json({ success: true, users: users.map((user) => user.toSafeJSON()) });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    if (!validId(req.params.id)) throw fail("Invalid user id", 400);
    if (req.params.id === req.user.id && req.body.role === "customer")
      throw fail("You cannot remove your own admin role", 400);
    if (req.params.id === req.user.id && req.body.status === "suspended")
      throw fail("You cannot suspend your own account", 400);

    const updates = {};
    if (typeof req.body.name === "string" && req.body.name.trim()) updates.name = req.body.name.trim();
    if (["customer", "admin"].includes(req.body.role)) updates.role = req.body.role;
    if (["active", "suspended"].includes(req.body.status)) updates.status = req.body.status;

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) throw fail("User not found", 404);
    res.json({ success: true, user: user.toSafeJSON() });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    if (!validId(req.params.id)) throw fail("Invalid user id", 400);
    if (req.params.id === req.user.id) throw fail("You cannot delete your own account here", 400);
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw fail("User not found", 404);
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    next(error);
  }
}

async function listCategories(req, res, next) {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const { name, description = "", isActive = true } = req.body;
    if (!name?.trim()) throw fail("Category name is required", 422);
    const category = await Category.create({ name: name.trim(), slug: slugify(name), description, isActive });
    res.status(201).json({ success: true, category });
  } catch (error) {
    next(error.code === 11000 ? fail("Category name already exists", 409) : error);
  }
}

async function updateCategory(req, res, next) {
  try {
    if (!validId(req.params.id)) throw fail("Invalid category id", 400);
    const { name, description, isActive } = req.body;
    const updates = {};
    if (typeof name === "string" && name.trim()) {
      updates.name = name.trim();
      updates.slug = slugify(name);
    }
    if (typeof description === "string") updates.description = description;
    if (typeof isActive === "boolean") updates.isActive = isActive;
    const category = await Category.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!category) throw fail("Category not found", 404);
    res.json({ success: true, category });
  } catch (error) {
    next(error.code === 11000 ? fail("Category name already exists", 409) : error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    if (!validId(req.params.id)) throw fail("Invalid category id", 400);
    const productCount = await Product.countDocuments({ category: req.params.id });
    if (productCount) throw fail("Category cannot be deleted while products use it", 409);
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) throw fail("Category not found", 404);
    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    next(error);
  }
}

async function listProducts(req, res, next) {
  try {
    const filter = req.user?.role === "admin" ? {} : { status: "active" };
    const products = await Product.find(filter).populate("category", "name slug").sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const { name, description = "", price, compareAtPrice = null, image = "", stock = 0, status = "active", category } = req.body;
    if (!name?.trim() || price === undefined || !validId(category)) throw fail("Name, price and a valid category are required", 422);
    const product = await Product.create({ name: name.trim(), slug: `${slugify(name)}-${Date.now()}`, description, price, compareAtPrice, image, stock, status, category, createdBy: req.user.id });
    res.status(201).json({ success: true, product: await product.populate("category", "name slug") });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    if (!validId(req.params.id)) throw fail("Invalid product id", 400);
    const allowed = ["name", "description", "price", "compareAtPrice", "image", "stock", "status", "category"];
    const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    if (updates.category && !validId(updates.category)) throw fail("Invalid category id", 422);
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).populate("category", "name slug");
    if (!product) throw fail("Product not found", 404);
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    if (!validId(req.params.id)) throw fail("Invalid product id", 400);
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw fail("Product not found", 404);
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = { listUsers, updateUser, deleteUser, listCategories, createCategory, updateCategory, deleteCategory, listProducts, createProduct, updateProduct, deleteProduct };
