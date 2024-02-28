import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  braintreeID: String,
  userID: String,
  items: [
    {
      name: String,
      cost: Number,
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
