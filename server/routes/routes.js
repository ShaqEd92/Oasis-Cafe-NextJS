import express from "express";

import {
  customerCreate,
  customerDelete,
  customerFind,
  customerUpdate,
} from "../controllers/customer.js";
import { getOrders, saveOrder } from "../controllers/order.js";
import {
  paymentMethodCreate,
  paymentMethodDelete,
  paymentMethodFind,
  paymentMethodUpdate,
} from "../controllers/paymentMethod.js";
import {
  subscriptionCancel,
  subscriptionCreate,
  subscriptionFind,
  subscriptionUpdate,
} from "../controllers/subscription.js";
import {
  generateClientToken,
  transactionSale,
  transactionSale2,
} from "../controllers/transaction.js";
import {
  addSubscription,
  listUsers,
  login,
  register,
} from "../controllers/user.js";

const router = express.Router();

// User

router.get("/users", listUsers);

router.post("/users/register", register);

router.post("/users/login", login);

router.put("/users/subscription/:user/:id", addSubscription);

// Transaction

router.get("/generate-client-token", generateClientToken);

router.post("/transaction-sale", transactionSale);

router.post("/transaction-sale-2", transactionSale2);

// Subscription

router.post("/subscription-create", subscriptionCreate);

router.get("/subscription-find/:id", subscriptionFind);

router.put("/subscription-update/:id", subscriptionUpdate);

router.put("/subscription-cancel/:id", subscriptionCancel);

// Customer

router.post("/customer-create", customerCreate);

router.get("/customer-find/:id", customerFind);

router.put("/customer-update/:id", customerUpdate);

router.delete("/customer-delete/:id", customerDelete);

// Payment methods

router.post("/payment-create", paymentMethodCreate);

router.get("/payment-find/:token", paymentMethodFind);

router.put("/payment-update/:token", paymentMethodUpdate);

router.delete("/payment-delete/:token", paymentMethodDelete);

// Order

router.post("/orders", saveOrder);

router.get("/orders/:id", getOrders);

export default router;
