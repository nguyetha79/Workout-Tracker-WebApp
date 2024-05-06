// Author: iamshaunjp
// Date: 13 Dec 2020
// Title of source code: Full React Tutorial - Programmatic Redirects
// Type: source code
// Web address: https://github.com/iamshaunjp/Complete-React-Tutorial/blob/lesson-30/dojo-blog/src/BlogDetails.js

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = () => {
  const { id: workout_id } = useParams();
  const {
    data: workout,
    error,
    isPending,
  } = useFetch("https://workout-tracker-webapp.onrender.com/api/workouts/" + workout_id);
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [updateMode, setUpdateMode] = useState(false)
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [sets, setSets] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [restPeriods, setRestPeriods] = useState("");
  const [tempo, setTempo] = useState("");
  const [description, setDescription] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [emptyError, setEmptyError] = useState(null);

  // useEffect(() => {
  //   setTitle(workout.title)
  // }, [workout])

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("https://workout-tracker-webapp.onrender.com/api/workouts/" + workout_id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }

    navigate("/");
  };

  const handleUpdate = async () => {
    if (!user) {
      return;
    }
    
    // Check if any fields are empty
    const emptyFieldsArray = [];
    if (!title) emptyFieldsArray.push("title");
    if (!type) emptyFieldsArray.push("type");
    if (!sets) emptyFieldsArray.push("sets");
    if (!load) emptyFieldsArray.push("load");
    if (!reps) emptyFieldsArray.push("reps");
    if (!restPeriods) emptyFieldsArray.push("restPeriods");
    if (!tempo) emptyFieldsArray.push("tempo");
    if (!description) emptyFieldsArray.push("description");
    
    if (emptyFieldsArray.length > 0) {
      setEmptyError("Please fill out all required fields.");
      setEmptyFields(emptyFieldsArray);
      return;
    } 

    let body = {title, type, sets, load, reps, restPeriods, tempo, description}
    console.log(title)

    const response = await fetch("api/workouts/" + workout_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(body)
    });
    const json = await response.json();

    if (json.error) {
      setEmptyError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
      setUpdateMode(false)
    }
  };

  // Author: dcode
  // Date: 15 April 2019
  // Title of source code: How to Style HTML Tables with CSS
  // Type: source code
  // Web address: https://dcode.domenade.com/tutorials/how-to-style-html-tables-with-css 
  return (
    <div className="workout-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {workout && (
        <article>
          {updateMode ? (
              <form className="update" onSubmit={handleUpdate}>
              <h3>Update Workout</h3>
        
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
                    <option value=""></option>
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
                    <option value=""></option>
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
        
              <button>Update Workout</button>
              {emptyError && <div className="error">{emptyError}</div>}
            </form>
          ): (
            <div>
            <h2> {workout.title}</h2>
            <p>
              <i>
                {formatDistanceToNow(new Date(workout.createdAt), {
                  addSuffix: true,
                })}
              </i>
            </p>
            <div className="icons">
              <span className="material-symbols-outlined" onClick={handleDelete}>
                delete
              </span>
              <span className="material-symbols-outlined" onClick={() => setUpdateMode(true)}>
                edit
              </span>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>Type</th>
                  <th>Sets </th>
                  <th>Load</th>
                  <th>Reps</th>
                  <th>Rest Periods</th>
                  <th>Tempo</th>
                </tr>
                <tr>
                  <td>{workout.type}</td>
                  <td>{workout.sets}</td>
                  <td>{workout.load}</td>
                  <td>{workout.reps}</td>
                  <td>{workout.restPeriods}</td>
                  <td>{workout.tempo}</td>
                </tr>
              </tbody>
            </table>
            <div className="desc">
              <h4>Description</h4>
              <hr />
              <p>{workout.description}</p>
            </div>
          </div>
          )}
        </article>
      )}
    </div>
  );
};

export default WorkoutDetails;
