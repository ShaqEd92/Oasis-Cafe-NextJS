import gateway from "../lib/gateway.js";

export const subscriptionCreate = (req, res) => {
  gateway.subscription.create(
    {
      paymentMethodToken: req.body.token,
      planId: req.body.planId,
    },
    (err, result) => {
      if (err) res.json({ message: err });
      res.json(result);
    }
  );
};

export const subscriptionFind = (req, res) => {
  gateway.subscription.find(req.params.id, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
};

export const subscriptionUpdate = (req, res) => {
  gateway.subscription.update(
    req.params.id,
    {
      //Todo: Add relevant update parameters
    },
    (err, result) => {
      if (err) res.json(err);
      res.json(result);
    }
  );
};

export const subscriptionCancel = (req, res) => {
  gateway.subscription.cancel(req.params.id, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
};
