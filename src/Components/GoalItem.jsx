import React from 'react';
import DepositForm from './DepositForm.jsx';

function GoalItem({ goal, onEdit, onDelete, onDeposit }) {
  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const daysLeft = Math.floor((new Date(goal.deadline).getTime() - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24));
  
  let status = '';
  if (goal.savedAmount >= goal.targetAmount) status = 'Completed!';
  else if (daysLeft <= 0) status = 'Overdue!';
  else if (daysLeft <= 30) status = `Warning! ${daysLeft} days left`;
  else status = `${daysLeft} days left`;

  return (
    <div>
      <h3>{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Deadline: {goal.deadline}</p>
      <p>Saved: ${goal.savedAmount.toFixed(2)} / Target: ${goal.targetAmount.toFixed(2)}</p>
      <p>Remaining: ${(goal.targetAmount - goal.savedAmount).toFixed(2)}</p>
      <p>Status: {status}</p>
      <div style={{ width: '100%', height: '10px', backgroundColor: '#eee' }}>
        <div style={{ width: `${Math.min(100, progress)}%`, height: '10px', backgroundColor: 'green' }}></div>
      </div>
      <p>{progress.toFixed(1)}% complete</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={() => onDelete(goal.id)}>Delete</button>
      <DepositForm goalId={goal.id} onDeposit={onDeposit} />
    </div>
  );
}

export default GoalItem;