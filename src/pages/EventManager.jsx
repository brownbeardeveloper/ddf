import React, { useState, useEffect } from 'react';
import { addDoc, deleteDoc, getDocs, getDoc, updateDoc, doc, collection } from 'firebase/firestore'; 
import { db } from '../backend/firebase-config';
import { HashLoader } from 'react-spinners';

export default function EventManager(userObject) {

  const { user } = userObject;
  const [loading, setLoading] = useState(true); 
  const [activeEditModeId, setActiveEditModeId] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const documentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setDocuments(documentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  const handleCreateEvent = async (event) => {
    event.preventDefault();
  
    try {
      await addDoc(collection(db, "events"), {
        title: newEventTitle,
        date: newEventDate,
        description: newEventDescription,
        user: { name: user.name, email: user.email, organization: user.organization },
      });
  
      // Reset the form after the data is successfully added to the database
      event.target.reset();
      setNewEventTitle("");
      setNewEventDate("");
      setNewEventDescription("");
  
      alert('Ditt evenemang har nu blivit tillagt.')
    } catch (error) {
      alert('Evenemanget kunde inte skapas. Var vänlig stäng fönstret och försök igen, annars kontakta administratören.')
      console.error('ERROR: ', error)
    }
  }

  const handleRemoveEvent = async (id) => {
    try {
      const docSnap = await getDoc(doc(db, 'events', id));

      if (docSnap.exists()) {
        await deleteDoc(doc(db, 'events', id)); 
        setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.id !== id));
        alert('Ditt evenemang har raderats.');
      } else {
        alert('Evenemanget kunde inte hittas.');
      }
    } catch (error) {
      alert('Försöket att radera evenemanget misslyckades. Error: ' + error);
      console.error('ERROR: ', error);
    }
  };

  const handleEditEvent = async (id) => {
    if(activeEditModeId === id){

      setActiveEditModeId(null)

    } else {

      const documentToEdit = documents.find(doc => doc.id === id)

      if (documentToEdit != null) {
        setEditTitle(documentToEdit.title);
        setEditDate(documentToEdit.date);
        setEditDescription(documentToEdit.description);
        setActiveEditModeId(id);
      } else {
        alert("error documentToEdit is null")
      }
    }
  }

  const handleSaveEditedEvent = async (id, event) => { 
    event.preventDefault()

    try {
      const docSnap = await getDoc(doc(db, 'events', id));

      if (docSnap.exists()) {
  
        await updateDoc(doc(db, 'events', id), { 
          title: editTitle,
          date: editDate,
          description: editDescription,
          user: user
        });

        const updatedDocuments = documents.map(doc => {
          if (doc.id === id) {
            return { ...doc, editTitle, editDate, editDescription };
          }
          return doc;
        });
  
        setDocuments(updatedDocuments)
        setActiveEditModeId(null)

        alert('Ditt evenemang har ändrats.');
      } else {
        alert('Evenemanget kunde inte hittas.');
      }
    } catch (error) {
      alert('Försöket att ändra evenemanget misslyckades. Error: ' + error);
      console.error('ERROR: ', error);
    }
  }

  const sortedDocuments = [...documents].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="remove-event">
      <h1>Evenemangshanterare</h1>

      <div className="create-event-container">
        <h2>Skapa Nytt Evenemang</h2>
        <form id="myform" onSubmit={handleCreateEvent}>
          <div>
            <label>Rubrik:</label>
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Datum:</label>
            <input
              type="date"
              value={newEventDate}
              onChange={(e) => setNewEventDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Beskrivning:</label>
            <textarea
              value={newEventDescription}
              onChange={(e) => setNewEventDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit">Skapa Evenemanget</button>
        </form>
      </div>



      {loading ? (
        <div className="loader-container">
          <HashLoader color="#d69d36" loading size={75} />
        </div>
        ) : (
        <ul>
          {sortedDocuments.map((document) => (
            (user.auth === 'admin' || user.organization === document.user.organization) ? (
              <li key={document.id}>
                <div class="event-item">
                  <h3>{document.date} - {document.user.organization} : {document.title}</h3>
                  <div class="event-details">
                    <p>{document.description}</p>
                    <p>Skapad av {document.user.name}</p>
                  </div>
                </div>
                
                { activeEditModeId === document.id && (
                  <div className='edit-mode'>
                    <form id="myform" onSubmit={(event) => handleSaveEditedEvent(document.id, event)}>
                      <div>
                        <label>Rubrik:</label>
                        <input
                          type="text"
                          value={editTitle} 
                          onChange={(e) => setEditTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label>Datum:</label>
                        <input
                          type="date"
                          value={editDate} 
                          onChange={(e) => setEditDate(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label>Beskrivning:</label>
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)} 
                          required
                        />
                      </div>
                      <button type="submit">Uppdatera Evenemanget</button>
                    </form>
                  </div>
                )}
                <button onClick={() => handleRemoveEvent(document.id)}>Ta bort</button>
                <button value="editBtn" onClick={(event) => handleEditEvent(document.id, event)}>
                  { activeEditModeId === document.id ? "Avbryta" : "Redigera" }
                </button>
              </li>
            ) : null
          ))}
        </ul>
      )}
    </div>
  )
}