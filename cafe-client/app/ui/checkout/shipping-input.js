import _states from "../../../data/US_States";

const ShippingInput = ({ deliveryInfo }) => (
  <>
    <h4 className="text-lg font-semibold">Delivery Information</h4>
    <div className="ml-4">
      <label className="font-semibold" htmlFor="line1">Address:</label>
      <input
        className="border-b outline-none jose italic"
        type="text"
        placeholder="123 Main St"
        name="line1"
        id="line1"
        defaultValue={deliveryInfo.line1}
        required
      />
      <input
        className="border-b outline-none jose italic"
        type="text"
        placeholder="Apt, suite, floor etc."
        name="line2"
        id="line2"
        defaultValue={deliveryInfo.line2}
      />
      <br />
      <label className="font-semibold" htmlFor="city">City:</label>
      <input
        className="border-b outline-none jose italic"
        type="text"
        name="city"
        id="city"
        defaultValue={deliveryInfo.city}
        required
      />
      <br />
      <label className="font-semibold" htmlFor="state">State:</label>
      <select
        className="ml-4 jose italic"
        name="state"
        id="state"
        defaultValue={deliveryInfo.state}
        required
      >
        <option value="" disabled>
          -- Select State --
        </option>
        {_states.map((_state) => (
          <option key={_state.value} value={_state.value}>
            {_state.label}
          </option>
        ))}
      </select>
      <br />
      <br />
      <label className="font-semibold" htmlFor="postal_code">Zip Code:</label>
      <input
        className="border-b outline-none jose italic"
        type="text"
        name="postal_code"
        id="postal_code"
        defaultValue={deliveryInfo.postal_code}
        required
      />
    </div>
  </>
);

export default ShippingInput;
