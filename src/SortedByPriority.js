import React, { useState, useEffect } from 'react';
import './SortedByPriority.css';
import Navbar from './Navbar.js';

const priorityLabels = {
  0: 'Urgent',
  1: 'High Priority',
  2: 'Medium Priority',
  3: 'Low Priority',
};

const SortedByPriority = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        const ticketsWithPriority = data.tickets.map(ticket => ({
          ...ticket,
          priority: ticket.priority in priorityLabels ? ticket.priority : 3
        }));
        const sortedTickets = ticketsWithPriority.sort((a, b) => a.priority - b.priority);
        setTickets(sortedTickets);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="sorted-tickets-container">
      {tickets.map(ticket => (
        <div key={ticket.id} className="ticket">
          <h3>{ticket.title}</h3>
          <p className={`priority-tag priority-${ticket.priority}`}>
            Priority: {priorityLabels[ticket.priority]}
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </p>
          <p></p>
          <p></p>
        </div>
      ))}
    </div>
  );
};

export default SortedByPriority;
