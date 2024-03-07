import User from "../models/user.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const _user = await User.findOne({
    email: req.body.email,
  });
  if (_user)
    res.status(409).json({ message: "This username is already taken." });
  else {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      stripeId: req.body.stripeId,
      subscriptions: [],
    };
    const newUser = new User(user);
    try {
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (await bcrypt.compare(req.body.password, user.password))
      res.status(200).json(user);
    else res.status(401).json({ message: error.message });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addAddress = async (req, res) => {
  const { stripeId, address } = req.body
  try {
    const user = await User.findOneAndUpdate({
      stripeId: stripeId,
    }, { "$push": { deliveryAddresses: address } });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}