const cartModel = require("../models/cart.model");
const errorHandler = require("../helpers/errorHandler");
const successHandler = require("../helpers/successHandler");
class Cart {
  // --------------user control for his cart--------------------
  static addCartItem = async (req, res) => {
    try {
      const cartItem = await new cartModel({
        ...req.body,
        userId: req.user._id,
        productId: req.params.productId,
      });
      await cartItem.save();
      successHandler(cartItem, res, "product added to cart successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
  static removeCartItem = async (req, res) => {
    try {
      await cartModel.deleteOne({
        _id: req.params.productId,
        userId: req.user._id,
      });
      successHandler(null, res, "product removed to cart successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
  static myCart = async (req, res) => {
    try {
      const myCart = await cartModel
        .find({ userId: req.user._id })
        .populate("productId")
        .populate("userId");
      successHandler(myCart, res, "cart shown successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
  static editCartAmount = async (req, res) => {
    try {
      let cartItem = await cartModel.updateOne(
        { _id: req.params.productId, userId: req.user._id },
        { amount: req.body.amount }
      );
      if (!cartItem) throw new Error();
      successHandler(
        cartItem,
        res,
        "product amount updated in cart successfully"
      );
    } catch (e) {
      errorHandler(e, res);
    }
  };
  static clearCart = async (req, res) => {
    try {
      await cartModel.deleteMany({ userId: req.user._id });
      successHandler(null, res, "cart cleared successfully");
    } catch (e) {
      errorHandler(e, res);
    }
  };
}
module.exports = Cart;
