import React, { useState, useEffect } from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import SortedByPriority from './SortedByPriority.js'; 
import SortByUser from './SortedByUser.js'; 


const mapPriorityToLabel = (priority) => {
  const priorityMap = {
    0: 'Urgent',
    1: 'High Priority',
    2: 'Medium Priority',
    3: 'Low Priority',
  };
  return priorityMap[priority] || 'Low Priority';
};

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchTicketsAndUsers = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        const availableUsers = data.users.filter(user => user.available);
        const assignedTickets = data.tickets.map(ticket => {
          if (ticket.userId) return ticket; 
          const randomIndex = Math.floor(Math.random() * availableUsers.length);
          const assignedUser = availableUsers.splice(randomIndex, 1)[0];
          return { ...ticket, userId: assignedUser.id };
        });
        setTickets(assignedTickets);
        setUsers(data.users);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      }
    };

    fetchTicketsAndUsers();
  }, []);

  const renderTicket = (ticket) => {
    const assignedUser = users.find(user => user.id === ticket.userId);
    return (
      <div key={ticket.id} className="ticket">
        <h3>{ticket.title}</h3>
        <p className={`priority-tag priority-${ticket.priority}`}>
          Priority: {mapPriorityToLabel(ticket.priority)}
        </p>
        <p>Status: {ticket.status}</p>
        {assignedUser && (
          <>
            <p>Assigned to: {assignedUser.name}</p>
            <p className={`availability-tag ${assignedUser.available ? 'Available' : 'Unavailable'}`}>
              {assignedUser.available ? 'Person Available' : 'Person Unavailable'}
            </p>
          </>
        )}
      </div>
    );
  };

  const renderColumn = (status) => (
    <div className="column">
      <h2>{status}</h2>
      {tickets.filter(ticket => ticket.status === status).map(renderTicket)}
    </div>
  );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  
document.addEventListener("contextmenu", e => e.preventDefault(), false);


document.addEventListener("keydown", e => {
  if (e.ctrlKey || e.keyCode === 123) { // CTRL+U or F12
    e.stopPropagation();
    e.preventDefault();
  }
});

  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/sorted-by-priority" element={<SortedByPriority />} />
        <Route path="/sort-by-user" element={<SortByUser />} />
      </Routes>
      <div className="kanban-board">
        {renderColumn('Todo')}
        {renderColumn('In progress')}
        {renderColumn('Backlog')}
      </div>
    </Router>
  );
};

export default App;

