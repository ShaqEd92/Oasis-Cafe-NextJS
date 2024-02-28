import gateway from "../lib/gateway.js";

export const generateClientToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) console.log(err);
    const clientToken = response.clientToken;
    res.json(clientToken);
  });
};

export const transactionSale = (req, res) => {
  const { nonce } = req.body.paymentMethodNonce;
  const amount = req.body.amount;
  const orderId = req.body.orderId;
  const customerId = req.body.customerId;
  const customerObject = req.body.personalInformation;
  const billingObject = req.body.billingInformation;
  const shippingObject = req.body.shippingInformation;
  const vaultPaymentMethod = req.body.vaultPaymentMethod;
  gateway.transaction.sale(
    {
      amount: amount,
      paymentMethodNonce: nonce,
      orderId: orderId,
      customerId: customerId,
      billing: {
        firstName: customerObject.firstName,
        lastName: customerObject.lastName,
        streetAddress: billingObject.billingStreetAddress,
        extendedAddress: billingObject.billingExtendedAddress,
        locality: billingObject.billingCity,
        region: billingObject.billingState,
        postalCode: billingObject.billingPostalCode,
        countryCodeAlpha2: billingObject.billingCountry,
      },
      shipping: {
        firstName: customerObject.firstName,
        lastName: customerObject.lastName,
        streetAddress: shippingObject.shippingStreetAddress,
        extendedAddress: shippingObject.shippingExtendedAddress,
        locality: shippingObject.shippingCity,
        region: shippingObject.shippingState,
        postalCode: shippingObject.shippingPostalCode,
        countryCodeAlpha2: shippingObject.shippingCountry,
      },
      options: {
        addBillingAddressToPaymentMethod: true,
        storeInVaultOnSuccess: vaultPaymentMethod,
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.json(err);
      }
      res.json(result);
    }
  );
};

export const transactionSale2 = (req, res) => {
  const token = req.body.token;
  const amount = req.body.amount;
  const orderId = req.body.orderId;
  gateway.transaction.sale(
    {
      amount: amount,
      paymentMethodToken: token,
      orderId: orderId,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.json(err);
      }
      res.json(result);
    }
  );
};
