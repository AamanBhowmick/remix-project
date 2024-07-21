import React from "react";
import noteListStyle from "./NoteList.css";
import { Link } from "@remix-run/react";

type Note = {
  id: string;
  title: string;
  content: string;
};

type NoteListProps = {
  notes: Note[];
};

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  return (
    <div>
      <ul id="note-list">
        {notes?.length > 0 ? (
          <>
            {notes.map((note, index) => (
              <li key={note.id} className="note">
                <Link to={"/" + note.id}>
                  <article>
                    <header>
                      <ul className="note-meta">
                        <li>#{index + 1}</li>
                        <li>
                          <time dateTime={note.id}>
                            {new Date(note.id).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </time>
                        </li>
                      </ul>
                      <h2>{note.title}</h2>
                    </header>
                    <p>{note.content}</p>
                  </article>
                </Link>
              </li>
            ))}
          </>
        ) : (
          <h2>No Notes available</h2>
        )}
      </ul>
    </div>
  );
};

export function links() {
  return [{ rel: "stylesheet", href: noteListStyle }];
}

export default NoteList;
