import { ActionFunction, json, redirect } from "@remix-run/node";
import React from "react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "~/data/notes";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { Link, MetaFunction, useLoaderData } from "@remix-run/react";

const NotesPage = () => {
    
  const notes:any =  useLoaderData();

  return (
    <div>
      <NewNote />
      <NoteList notes={notes} />
    </div>
  );
};

// Get Data
export const loader = async () => {
    const notes = await getStoredNotes();

    if (!notes || notes.length === 0 ) {
      throw json(
        {message: 'Could not find any notes.'},
        {
          status: 404,
          statusText: 'Not Found',
        }
      )
    }

    return json(notes);
    // return notes;
    // return new Response(JSON.stringify(notes), {headers: {'Content-Type': 'application/json'}});
}

// Post Data
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // const noteData = {
  //     title: formData.get('title'),
  //     content: formData.get('content'),
  // }
  const noteData = Object.fromEntries(formData);

  // Add validation...
  if (typeof noteData.title === "string" && noteData.title.trim().length < 5) {
    return { message: 'Invalid title - must be at least 5 characters long.'};
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  // await new Promise<void>((resolve, reject) => 
  //   setTimeout(() => resolve(), 2000)
  // )
  return redirect("/notespage");
};

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export const meta: MetaFunction = () => {
  return [
    { title: "All Notes" },
    {
      property: "og:title",
      content: "Remix Notes",
    },
    {
      name: "description",
      content: "View all your notes here",
    },
  ];
}


export function ErrorBoundary({error} : {error: any}) {
  
  const errorMessage = error?.message || "An unexpected error related to notes occurred.";
  const errorStack = error?.stack || "No stack trace available.";

  return (
    <main className="error">
          <h1>An error related to notes occurred!</h1>
          <p>{errorMessage}</p>
          <pre>{errorStack}</pre>
          <p>
            Back to <Link to="/">Safety!</Link>
          </p>
    </main>
  )
}


export default NotesPage;
