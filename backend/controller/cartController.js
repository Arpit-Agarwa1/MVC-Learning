import Cart from "../model/cartModel.js";

// ADD TO CART
export async function addToCart(req, res) {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    const existing = await Cart.findOne({ userId, productId });

    if (existing) {
      existing.quantity += 1;
      await existing.save();

      return res.json(existing);
    }

    const cart = new Cart({
      userId: userId,
      productId: productId,
      quantity: 1,
    });

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
}

// GET CART ITEMS
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.find({ userId }).populate("productId");

    res.json(cart);
  } catch (error) {
    res.status(500).json(error);
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
