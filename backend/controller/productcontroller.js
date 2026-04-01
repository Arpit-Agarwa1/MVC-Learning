import Product from "../model/productmodel.js";

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const createProduct = async (req, res) => {
  console.log("pass 1");
  try {
    const { title, mrp, sellingPrice, description } = req.body;

    const image = req.file ? req.file.filename : null; // ✅ FIX
    console.log("pass 2");
    const product = await Product.create({
      title,
      mrp,
      sellingPrice,
      description,
      image,
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Product creation failed" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
