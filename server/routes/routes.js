import express from "express";

import { addAddress, login, register } from "../controllers/user.js";
import { getPaymentInfo, preparePayment, prepareQuickPayment } from "../controllers/payment.js";
import {
  customerCreate,
  customerRetrieve,
  customerUpdate,
  customerDelete,
  customerPaymentMethods,
} from "../controllers/customer.js";
import {
  paymentMethodCreate,
  paymentMethodRetrieve,
  paymentMethodUpdate,
  paymentMethodDetach,
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

router.post("/users/add-address", addAddress);

// Payment

router.post("/prepare-payment", preparePayment)

router.post("/prepare-quick-payment", prepareQuickPayment)

router.get("/payment-id/:id", getPaymentInfo)

// Customer

router.post("/customer-create", customerCreate);

router.get("/customer-retrieve/:id", customerRetrieve);

router.put("/customer-update/:id", customerUpdate);

router.delete("/customer-delete/:id", customerDelete);

router.get("/customer-payments/:id", customerPaymentMethods);

// Payment methods

router.post("/payment-create", paymentMethodCreate);

router.get("/payment-retrieve/:id", paymentMethodRetrieve);

router.put("/payment-update/:id", paymentMethodUpdate);

router.delete("/payment-detach/:id", paymentMethodDetach);

// Subscription

router.post("/subscription-create", subscriptionCreate);

router.get("/subscription-retrieve/:id", subscriptionRetrieve);

router.put("/subscription-update/:id", subscriptionUpdate);

router.put("/subscription-cancel/:id", subscriptionCancel);

export default router;
