import express from "express";

import { login, register } from "../controllers/user.js";
import { createCharge } from "../controllers/charge.js";
import {
  customerCreate,
  customerRetrieve,
  customerUpdate,
  customerDelete,
} from "../controllers/customer.js";
import {
  paymentMethodCreate,
  paymentMethodRetrieve,
  paymentMethodUpdate,
  paymentMethodDelete,
} from "../controllers/paymentMethod.js";
import {
  subscriptionCreate,
  subscriptionRetrieve,
  subscriptionUpdate,
  subscriptionCancel,
} from "../controllers/subscription.js";

const router = express.Router();

// User

router.post("/users/register", register);

router.post("/users/login", login);

// Charge

router.post("/charge", createCharge);

// Customer

router.post("/customer-create", customerCreate);

router.get("/customer-retrieve/:id", customerRetrieve);

router.put("/customer-update/:id", customerUpdate);

router.delete("/customer-delete/:id", customerDelete);

// Payment methods

router.post("/payment-create", paymentMethodCreate);

router.get("/payment-retrieve/:token", paymentMethodRetrieve);

router.put("/payment-update/:token", paymentMethodUpdate);

router.delete("/payment-delete/:token", paymentMethodDelete);

// Subscription

router.post("/subscription-create", subscriptionCreate);

router.get("/subscription-retrieve/:id", subscriptionRetrieve);

router.put("/subscription-update/:id", subscriptionUpdate);

router.put("/subscription-cancel/:id", subscriptionCancel);

export default router;
