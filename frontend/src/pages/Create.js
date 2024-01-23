// Author: iamshaunjp
// Date: 13 Dec 2020
// Title of source code: Full React Tutorial - Making a POST Request
// Type: source code
// Web address: https://github.com/iamshaunjp/Complete-React-Tutorial/blob/lesson-29/dojo-blog/src/Create.js

import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [sets, setSets] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [restPeriods, setRestPeriods] = useState("");
  const [tempo, setTempo] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = {
      title,
      type,
      sets,
      load,
      reps,
      restPeriods,
      tempo,
      description,
    };

    const response = await fetch("/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (json.error) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setType("");
      setSets("");
      setLoad("");
      setReps("");
      setRestPeriods("");
      setTempo("");
      setDescription("");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }

    navigate("/");
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <div className="grid grid--1x2">
        <div>
          <label>Excersize Title:</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes("title") ? "error" : ""}
          />
          <label>Type:</label>
          <select
            onChange={(e) => setType(e.target.value)}
            value={type}
            className={emptyFields.includes("type") ? "error" : ""}
          >
            <option value="none"></option>
            <option value="strength">Strength</option>
            <option value="hypertrophy">Hypertrophy</option>
            <option value="endurance">Endurance</option>
          </select>
          <label>Number of Sets:</label>
          <input
            type="number"
            onChange={(e) => setSets(e.target.value)}
            value={sets}
            className={emptyFields.includes("sets") ? "error" : ""}
          />
          <label>Load (in kg):</label>
          <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes("load") ? "error" : ""}
          />
          <label>Number of Reps:</label>
          <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes("reps") ? "error" : ""}
          />
        </div>
        <div>
          <label>Rest period between sets (in minute):</label>
          <select
            onChange={(e) => setRestPeriods(e.target.value)}
            value={restPeriods}
            className={emptyFields.includes("restPeriods") ? "error" : ""}
          >
            <option value="none"></option>
            <option value="2 min to 5 min">2 min to 5 min</option>
            <option value="0.5 min to 1.5 min">0.5 min to 1.5 min</option>
            <option value="0.5 min">0.5 min</option>
          </select>
          <label>Tempo:</label>
          <input
            type="text"
            onChange={(e) => setTempo(e.target.value)}
            value={tempo}
            className={emptyFields.includes("tempo") ? "error" : ""}
          />
          <label>Description:</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={emptyFields.includes("description") ? "error" : ""}
          ></textarea>
        </div>
      </div>

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Create;
