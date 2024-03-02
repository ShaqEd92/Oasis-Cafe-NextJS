import { formatter } from "../../../data/functions";

const OrderSummary = ({ orderObject }) => {
  return (
    <div className="order-summary">
      <h2 className="jose font-bold mb-2 text-contrast">ORDER SUMMARY</h2>
      <table>
        <tbody>
          <tr>
            <td>Subtotal:</td>
            <td>{formatter.format(orderObject.subTotal)}</td>
          </tr>
          <tr>
            <td>Delivery:</td>
            <td>{formatter.format(orderObject.shipping)}</td>
          </tr>
          <tr>
            <td>Tax:</td>
            <td>{formatter.format(orderObject.tax)}</td>
          </tr>
          <tr className="border-b" />
          <tr>
            <td style={{ fontWeight: "bold" }}>TOTAL</td>
            <td style={{ fontWeight: "bold" }}>
              {formatter.format(orderObject.total)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderSummary;
