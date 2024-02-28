import Order from "../models/order.js";

export const saveOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userID: req.params.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
