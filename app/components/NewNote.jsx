import React from "react";
import newNoteStyles from "./NewNote.css";
import { Form, useActionData, useNavigation } from "@remix-run/react";

const NewNote = () => {
  const navigation = useNavigation();

  const data = useActionData();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <Form method="post" id="note-form">
        {data?.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />
        </p>
        <p>
          <label htmlFor="content">Content</label>
          <textarea name="content" id="content" rows={5} required></textarea>
        </p>
        <div className="form-actions">
          <button disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Note"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export function links() {
  return [{ rel: "stylesheet", href: newNoteStyles }];
}

export default NewNote;
