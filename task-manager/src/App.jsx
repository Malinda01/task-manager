import { useEffect, useState } from "react";
import { initGoogleAuth, signIn, addEventToCalendar } from "./googleCalendar";

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    initGoogleAuth(setSignedIn);
  }, []);

  const addTask = async () => {
    if (!title || !date) return alert("Fill all fields");

    const start = new Date(date);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    await addEventToCalendar({
      title,
      description: "Task from Task Manager",
      start: start.toISOString(),
      end: end.toISOString(),
    });

    alert("Task added to Google Calendar 🎉");
    setTitle("");
    setDate("");
  };

  return (
    <div className="container">
      <h1>🗓️ Task Manager</h1>

      {!signedIn && (
        <button onClick={signIn} className="btn">
          Sign in with Google
        </button>
      )}

      {signedIn && (
        <>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={addTask} className="btn">
            Add Task
          </button>
        </>
      )}
    </div>
  );
}
