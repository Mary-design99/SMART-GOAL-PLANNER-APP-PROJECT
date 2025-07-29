import { useState, useEffect } from 'react';

function GoalForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({ name: '', targetAmount: '', category: '', deadline: '' });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: '', targetAmount: '', category: '', deadline: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {//listen for change in the input fieldsand updates the change
    const { name, value } = e.target;
    setFormData(initial => ({ ...initial, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: <input type="text" name="name" value={formData.name} onChange={handleChange} required /></label>
      <label>Target: <input type="number" name="targetAmount" value={formData.targetAmount} onChange={handleChange} required/></label>
      <label>Category: <input type="text" name="category" value={formData.category} onChange={handleChange} required /></label>
      <label>Deadline: <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required /></label>
      <div className="flex justify-end gap-6 mt-2">
      <button type="button" onClick={onCancel}>Cancel</button>
      <button type="submit">{initialData ? 'Update Goal' : 'Add Goal'}</button>
      </div>
    </form>
  );
}

export default GoalForm;