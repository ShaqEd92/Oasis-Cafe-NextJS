export const generateOrderID = () => {
  const selection =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQXYZ0123456789";
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += selection[Math.floor(Math.random() * 62)];
  }
  return id;
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});
