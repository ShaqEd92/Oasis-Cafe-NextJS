import gateway from "../lib/gateway.js";

export const paymentMethodCreate = (req, res) => {
  const { nonce } = req.body.paymentMethodNonce;
  const customerId = req.body.customerId;
  const userInformation = req.body.userInformation;
  const billingInformation = req.body.billingInformation;
  console.log(req.body)
  gateway.paymentMethod.create(
    {
      customerId: customerId,
      paymentMethodNonce: nonce,
      billingAddress: {
        firstName: userInformation.firstName,
        lastName: userInformation.lastName,
        streetAddress: billingInformation.billingStreetAddress,
        extendedAddress: billingInformation.billingExtendedAddress,
        locality: billingInformation.billingCity,
        region: billingInformation.billingState,
        postalCode: billingInformation.billingPostalCode,
        countryCodeAlpha2: billingInformation.billingCountry,
      },
    },
    (err, result) => {
      if (err) res.json(err);
      res.json(result);
    }
  );
};

export const paymentMethodFind = (req, res) => {
  gateway.paymentMethod.find(req.params.token, (err, paymentMethod) => {
    if (err) res.json(err);
    res.json(paymentMethod);
  });
};

export const paymentMethodUpdate = (req, res) => {
  gateway.paymentMethod.update(
    req.params.token,
    {
      //Todo: Add relevant parameters to update
    },
    (err, result) => {
      if (err) res.json(err);
      res.json(result);
    }
  );
};

export const paymentMethodDelete = (req, res) => {
  gateway.paymentMethod.delete(req.params.token, (err) => {
    if (err) res.json(err);
    res.json({ message: "Payment method successfully deleted." });
  });
};
