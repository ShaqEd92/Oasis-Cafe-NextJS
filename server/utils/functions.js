const PRICES = {
    COFFEE: 2.50,
    LATTE: 3,
    MOCHA: 3.5,
    TEA: 1.5
}

const getPrice = (name) => {
    let val = name.toUpperCase();
    let price = PRICES[val];
    return price;
}

export const generateOrderID = () => {
    const selection =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQXYZ0123456789";
    let id = "";
    for (let i = 0; i < 10; i++) {
        id += selection[Math.floor(Math.random() * 62)];
    }
    return id;
};

export const calculateFinalAmount = (cart) => {
    let subTotal = 0;
    cart.map((item) => subTotal += (getPrice(item.name) * item.quantity));

    let shipping = subTotal > 25 ? 0 : 5;
    let tax = (subTotal + shipping) * 0.1025;
    let total = subTotal + shipping + tax;
    let finalAmount = Math.round(total * 100)

    return finalAmount;
}