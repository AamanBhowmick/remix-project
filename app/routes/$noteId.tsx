import { json, Link, MetaFunction, useLoaderData } from "@remix-run/react";
import React from "react";
import { getStoredNotes } from "~/data/notes";
import styles from "~/styles/note-details.css";

const NoteDetailsPage = () => {
  const note: any = useLoaderData();

  return (
    <div>
      <main id="note-details">
        <header>
          <nav>
            <Link to={"/notespage"}>Back to all Notes</Link>
          </nav>
          <h1>{note.title}</h1>
        </header>
        <p id="note-detail-content">{note.content}</p>
      </main>
    </div>
  );
};

export async function loader({ params }: { params: any }) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note: { id: any }) => note.id === noteId);
  if (!selectedNote) {
    throw json(
      {message: 'Could not find note for id ' + noteId },
      {status: 404}
    );
  }
  return selectedNote;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = ({data}: {data: any}) => {
  return [
    { title: data.title },
    {
      property: "og:title",
      content: "Remix Notes",
    },
    {
      name: "description",
      content: "View this note",
    },
  ];
}

export default NoteDetailsPage;
