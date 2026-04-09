import Cart from "../model/cartModel.js";
import Product from "../model/productmodel.js";

// ADD TO CART
export async function addToCart(req, res) {
  try {
    const userId = req.user.id; // ✅ correct
    const { productId } = req.body;

    const existing = await Cart.findOne({ userId, productId });

    if (existing) {
      existing.quantity += 1;
      await existing.save();

      return res.json(existing);
    }

    const cart = new Cart({
      userId,
      productId,
      quantity: 1,
    });

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// GET CART ITEMS
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.find({ userId }).populate("productId");

    res.status(200).json(cart);
  } catch (error) {
    console.log("Cart error:", error);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// REMOVE ITEM
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    await Cart.findByIdAndDelete(id);

    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json(error);
  }
};
