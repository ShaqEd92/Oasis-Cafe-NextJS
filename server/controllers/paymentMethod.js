export const paymentMethodCreate = async (req, res) => {

};

export const paymentMethodRetrieve = async (req, res) => {
    const paymentMethodId = req.params.id;
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    res.json({ paymentMethod: paymentMethod });
};

export const paymentMethodUpdate = async (req, res) => {

};

export const paymentMethodDelete = async (req, res) => {

};
