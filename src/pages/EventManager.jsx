import React, { useState, useEffect } from 'react';
import { addDoc, deleteDoc, getDocs, getDoc, updateDoc, doc, collection } from 'firebase/firestore'; 
import { db } from '../backend/firebase-config';
import { HashLoader } from 'react-spinners';

export default function EventManager({ user }) {

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
    <main className="px-6 py-8 max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Evenemangshanterare</h1>

      <div className="bg-gray-100 p-6 rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Skapa Nytt Evenemang</h2>
        <form onSubmit={handleCreateEvent}>
          <div className="mb-4">
            <label className="block mb-1">Rubrik:</label>
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Datum:</label>
            <input
              type="date"
              value={newEventDate}
              onChange={(e) => setNewEventDate(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Beskrivning:</label>
            <textarea
              value={newEventDescription}
              onChange={(e) => setNewEventDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">Skapa Evenemanget</button>
        </form>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <HashLoader color="#d69d36" loading size={75} />
        </div>
        ) : (
        <ul className="space-y-6">
          {sortedDocuments.map((document) => (
            (user.auth === 'admin' || user.organization === document.user.organization) ? (
              <li key={document.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{document.date} - {document.user.organization} : {document.title}</h3>
                  <div>
                    <p className="italic text-sm text-gray-500">Skapad av {document.user.name}</p>
                  </div>
                </div>
                <p>{document.description}</p>
                <div className="mt-4">
                  <button onClick={() => handleRemoveEvent(document.id)} className="bg-red-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-red-600 transition duration-300 ease-in-out">Ta bort</button>
                  <button value="editBtn" onClick={() => handleEditEvent(document.id)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
                    { activeEditModeId === document.id ? "Avbryta" : "Redigera" }
                  </button>
                </div>
                { activeEditModeId === document.id && (
                  <div className="bg-gray-100 p-6 rounded-md mt-4">
                    <form onSubmit={(event) => handleSaveEditedEvent(document.id, event)}>
                      <div className="mb-4">
                        <label className="block mb-1">Rubrik:</label>
                        <input
                          type="text"
                          value={editTitle} 
                          onChange={(e) => setEditTitle(e.target.value)}
                          required
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1">Datum:</label>
                        <input
                          type="date"
                          value={editDate} 
                          onChange={(e) => setEditDate(e.target.value)}
                          required
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1">Beskrivning:</label>
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)} 
                          required
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 ease-in-out">Uppdatera Evenemanget</button>
                    </form>
                  </div>
                )}
              </li>
            ) : null
          ))}
        </ul>
      )}
    </main>
  )
}
