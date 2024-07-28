import React, { useState } from "react";

import Note from "../Note/Note";
import Search from "../Search/Search";

import "./NoteContainer.css";

function NoteContainer(props) {
  const [searchQuery, setSearchQuery] = useState("");

  const reverArray = (arr) => {
    const array = [];
    for (let i = arr.length - 1; i >= 0; --i) {
      array.push(arr[i]);
    }
    return array;
  };

  const notes = reverArray(props.notes);

  // Filter notes based on search query
  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="note-container">
      <h2>Notes</h2>
      <Search handleSearchNote={setSearchQuery} />
      <div className="note-container_notes custom-scroll">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((item) => (
            <Note
              key={item.id}
              note={item}
              deleteNote={props.deleteNote}
              updateText={props.updateText}
            />
          ))
        ) : (
          <h3>No Notes present</h3>
        )}
      </div>
    </div>
  );
}

export default NoteContainer;
