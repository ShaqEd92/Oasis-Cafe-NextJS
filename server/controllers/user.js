import User from "../models/user.js";
import bcrypt from "bcrypt";

export const listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
      braintreeID: req.body.braintreeID,
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
  const hash = await bcrypt.hash(req.body.password, 10);
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

export const addSubscription = async (req, res) => {
  const filter = { _id: req.params.user };
  const subscription = req.params.id;
  try {
    const user = await User.findOneAndUpdate(
      filter,
      { $push: { subscriptions: subscription } },
      {
        returnOriginal: false,
      }
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(422).json();
  }
};
