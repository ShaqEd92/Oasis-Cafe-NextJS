const PersonalInput = ({ personalInfo }) => (
  <>
    <h4 className="text-lg font-semibold">Contact Information</h4>
    <div className="ml-4">
      <label className="font-semibold" htmlFor="name">Full Name:</label>
      <input
        className="border-b outline-none jose italic"
        id="name"
        type="text"
        name="name"
        defaultValue={personalInfo.name}
        required
      />
      <br />
      <label className="font-semibold" htmlFor="email">Email:</label>
      <input
        className="border-b outline-none jose italic"
        id="email"
        type="email"
        name="email"
        defaultValue={personalInfo.email}
        required
      />
    </div>
  </>
);

export default PersonalInput;
