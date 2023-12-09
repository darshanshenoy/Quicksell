import React, { useState, useEffect } from 'react';
import './SortedByUser.css'; 
const SortedByUser = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const fetchTicketsAndUsers = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      }
    };

    fetchTicketsAndUsers();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const ticketsGroupedByUser = users.map(user => ({
    ...user,
    tickets: tickets.filter(ticket => ticket.userId === user.id),
  }));

  return (
    <div className="sorted-tickets-container">
      {ticketsGroupedByUser.map(user => (
        <div key={user.id} className="user-tickets">
          <h2>{user.name}</h2>
          {user.tickets.map(ticket => (
            <div key={ticket.id} className="ticket">
              <h3>{ticket.title}</h3>
            </div>
          ))}
        </div>
      ))}
      <div className={`overlay ${showOverlay ? 'active' : ''}`}></div>
    </div>
  );
};

export default SortedByUser;
