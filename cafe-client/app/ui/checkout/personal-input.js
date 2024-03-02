const PersonalInput = () => (
  <>
    <h4 className="text-lg font-semibold">Contact Information</h4>
    <div className="ml-4">
      <label className="font-semibold" htmlFor="firstName">Full Name:</label>
      <input
        className="border-b outline-none jose italic"
        id="firstName"
        type="text"
        name="firstName"
        required
      />
      <br />
      <label className="font-semibold" htmlFor="email">Email:</label>
      <input
        className="border-b outline-none jose italic"
        id="email"
        type="email"
        name="email"
        required
      />
    </div>
  </>
);

export default PersonalInput;
