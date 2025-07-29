import { useState, useEffect } from 'react';
import GoalForm from './Components/GoalForm.jsx';
import GoalItem from './Components/GoalItem.jsx';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false); // control visibility of the form  toggle for hide and display form
  const [currentGoal, setCurrentGoal] = useState(null); // The goal currently being added or edited

  useEffect(() => {// run code after rendering
    fetch('http://localhost:3000/goals')
      .then(res => res.json())// fetched data is converted to json format
      .then(setGoals) }, []);// the empty dependecy array prevents rerendering of app component

  const handleSaveGoal = (goalData) => {
    const isNew = !goalData.id;// checks for goal id  if not it is a new goal
    const method = isNew ? 'POST' : 'PATCH';
    const url = isNew ? 'http://localhost:3000/goals' : `http://localhost:3000/goals/${goalData.id}`;
    const payload = isNew ? { ...goalData, savedAmount: 0, createdAt: new Date().toISOString().split('T')[0] } : goalData;

    fetch(url, {//request to the server
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(savedGoal => {
        setGoals(prevGoals =>
          isNew ? [...prevGoals, savedGoal] : prevGoals.map(g => (g.id === savedGoal.id ? savedGoal : g))
        );
        setShowForm(false);
        setCurrentGoal(null);
      })
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/goals/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
        else console.log('Delete failed:');
      })
  };

  const handleDeposit = (goalId, amount) => {
    const goal = goals.find(goal => goal.id === goalId);
    if (!goal) return console.log('Goal not found for deposit');
    handleSaveGoal({ ...goal, savedAmount: goal.savedAmount + parseFloat(amount) });
  };

  return (
    <div>
      <h1>SMART GOAL PLANNER</h1>
      <button className='add-btn' onClick={() => { setShowForm(true); setCurrentGoal(null); }}>Add New Goal</button>

      {showForm && (
        <div>
          <h2>{currentGoal ? 'Edit Goal' : 'Add New Goal'}</h2>
          <GoalForm
            onSubmit={handleSaveGoal}
            initialData={currentGoal}
            onCancel={() => { setShowForm(false); setCurrentGoal(null); }}
          />
        </div>
      )}

      <div>
        {goals.length ? (
          goals.map(goal => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onEdit={() => { setShowForm(true); setCurrentGoal(goal); }}
              onDelete={handleDelete}
              onDeposit={handleDeposit}
            />
          ))
        ) : (
          <p>No goals to display.</p>
        )}
      </div>
    </div>
  );
}

export default App;