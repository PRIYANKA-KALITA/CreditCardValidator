import React, { useState } from "react";

const App = () => {

  const [errorMessage, setErrorMessage] = useState('');

  const validateCreditCard = async (value) => {
    setErrorMessage("Checking...");

    // Make POST request to Flask backend
    const res = await fetch("http://localhost:5000/api/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ card_number: value })
    });

    // Handle response from Flask
    const data = await res.json();
    if (data.valid) {
      setErrorMessage("✅ Valid Credit Card Number");
    } else {
      setErrorMessage("❌ Invalid Credit Card Number");
    }
  };

  return (
    <div style={{ marginLeft: '200px' }}>
      <pre>
        <h2>Validating Credit Card in ReactJS</h2>
        <span>Enter Credit Card: </span>
        <input
          type="text"
          onChange={(e) => validateCreditCard(e.target.value)}
        /> <br />
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{errorMessage}</span>
      </pre>
    </div>
  );
};

export default App;
