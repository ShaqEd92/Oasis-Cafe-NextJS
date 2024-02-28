import gateway from "../lib/gateway.js";

export const customerCreate = (req, res) => {
  const userObject = req.body;
  gateway.customer.create(
    {
      id: userObject.braintreeID,
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      email: userObject.email,
    },
    (err, result) => {
      if (err) {
        res.json(err);
      }
      console.log(result)
      res.json(result);
    }
  );
};

export const customerFind = (req, res) => {
  gateway.customer.find(req.params.id, (err, customer) => {
    if (err) {
      res.json(err);
    }
    res.json(customer);
  });
};

export const customerUpdate = (req, res) => {
  gateway.customer.update(
    req.params.id,
    {
      firstName: "New First Name",
      //Todo: Add relevant customer updates
    },
    (err, result) => {
      if (err) {
        res.json({ message: err });
      }
      if (result.success) {
        res.json(result);
      } else {
        res.json({ message: result.message });
      }
    }
  );
};

export const customerDelete = (req, res) => {
  gateway.customer.delete(req.params.id, (err) => {
    if (err) res.json({ message: err });
    res.json({ message: "Successfully deleted" });
  });
};
