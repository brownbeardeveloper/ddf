import React, { useState } from "react";
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../database/firebase-config'
import { useNavigate } from "react-router-dom";
import '../styles/CreateEvent.css'

export default function CreateEvent() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const postsCollectionRef = collection(db, "posts")
  // let navigate = useNavigate()

  const handleCreateEventSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await addDoc(postsCollectionRef, {
        eventDate,
        eventTitle,
        eventDescription,
        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      });
  
      // Reset the form after the data is successfully added to the database
      event.target.reset();
      setEventTitle("");
      setEventDate("");
      setEventDescription("");
  
      console.log('Event created successfully.');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };
  

  return (
    <div className="create-event">

      <div className="create-event-container">
        <h1>Create Event</h1>
        <form id="myform" onSubmit={handleCreateEventSubmit}>
          <div>
            <label>Event Title:</label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Event Date:</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Event Description:</label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create Event</button>
        </form>
      </div>

    </div>
  );
}