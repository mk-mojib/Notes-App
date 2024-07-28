import React, { useState, useEffect } from "react";
import deleteIcon from "../../assets/delete.svg";
import "./Note.css";

const timer = 500;

function Note({ note, updateText, deleteNote }) {
  const [text, setText] = useState(note.text);
  const [title, setTitle] = useState(note.title || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      updateText(text, note.id); // Update the note text in the parent component
      localStorage.setItem(
        `note-${note.id}`,
        JSON.stringify({ text, title })
      );
    }, timer);

    return () => {
      clearTimeout(handler);
    };
  }, [text, title, note.id, updateText]); // Include `note.id` and `updateText` in dependencies

  useEffect(() => {
    // Load from local storage when component mounts
    const savedNote = JSON.parse(localStorage.getItem(`note-${note.id}`));
    if (savedNote) {
      setText(savedNote.text);
      setTitle(savedNote.title || "");
    }
  }, [note.id]); // Only run when note.id changes

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    let hrs = date.getHours();
    let amPm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs % 12 || 12;

    let min = date.getMinutes();
    min = min < 10 ? "0" + min : min;

    let day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${hrs}:${min} ${amPm} ${day} ${month}`;
  };

  return (
    <div className="note" style={{ backgroundColor: note.color }}>
      <input
        placeholder="Note title"
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        aria-label="Note title"
      />
      <textarea
        placeholder="Note content..."
        className="note_text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        required
        aria-label="Note content"
      />
      <div className="note_footer">
        <p>{formatDate(note.time)}</p>
        <img
          src={deleteIcon}
          alt="Delete note"
          onClick={() => deleteNote(note.id)}
          aria-label="Delete note"
        />
      </div>
    </div>
  );
}

export default Note;
