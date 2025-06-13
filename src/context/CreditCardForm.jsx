import React, { useState } from 'react';

const CreditCardForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    expiration: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const formatCardNumber = (value) =>
    value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ').trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'number') updatedValue = formatCardNumber(value);
    if (name === 'cvv') updatedValue = value.replace(/\D/g, '').slice(0, 3);
    if (name === 'expiration') updatedValue = value.replace(/[^0-9\/]/g, '').slice(0, 5);

    setFormData({ ...formData, [name]: updatedValue });
    setErrors({});
    setSubmitted(false);
  };

  const validateForm = () => {
    const { name, number, expiration, cvv } = formData;
    const errors = {};

    if (!name.trim()) errors.name = 'Name is required.';
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(number)) errors.number = 'Enter a valid 16-digit card number.';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiration)) errors.expiration = 'Use MM/YY format.';
    if (!/^\d{3}$/.test(cvv)) errors.cvv = 'Enter a 3-digit CVV.';

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate secure save
    localStorage.setItem('creditCard', JSON.stringify(formData));
    setSubmitted(true);

    // Clear form
    setFormData({
      name: '',
      number: '',
      expiration: '',
      cvv: ''
    });

    // Trigger parent success logic and close
    if (onSuccess) onSuccess();
    if (onClose) onClose();
  };

  return (
    <div className="credit-card-form">
      {onClose && (
        <button className="close-btn" onClick={onClose} title="Close form">✖</button>
      )}
      <h2>Secure Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cardholder Name</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Card Number</label><br />
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            required
          />
          {errors.number && <p className="error">{errors.number}</p>}
        </div>

        <div>
          <label>Expiration (MM/YY)</label><br />
          <input
            type="text"
            name="expiration"
            value={formData.expiration}
            onChange={handleChange}
            placeholder="08/27"
            required
          />
          {errors.expiration && <p className="error">{errors.expiration}</p>}
        </div>

        <div>
          <label>CVV</label><br />
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="123"
            required
          />
          {errors.cvv && <p className="error">{errors.cvv}</p>}
        </div>

        <button type="submit">Confirm Payment</button>
      </form>
    </div>
  );
};

export default CreditCardForm;
