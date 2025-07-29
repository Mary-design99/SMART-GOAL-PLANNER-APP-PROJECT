import { useState } from 'react';

function DepositForm({ goalId, onDeposit }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(amount) > 0) {
      onDeposit(goalId, parseFloat(amount));
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Deposit" required />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;