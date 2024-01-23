import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = () => {
  const { id: workout_id } = useParams();
  const {
    data: workout,
    error,
    isPending,
  } = useFetch("api/workouts/" + workout_id);
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("api/workouts/" + workout_id, {
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

  return (
    <div className="workout-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {workout && (
        <article>
          <h2> {workout.title}</h2>
          <p>
            <i>
              {formatDistanceToNow(new Date(workout.createdAt), {
                addSuffix: true,
              })}
            </i>
          </p>

          <div className="icons">
            <span className="material-symbols-outlined" onClick={handleClick}>
              delete
            </span>
            <span className="material-symbols-outlined" onClick={() => setUpdateMode(true)}>
              edit
            </span>
          </div>

          <table>
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
          </table>

          <div className="desc">
            <h4>Description</h4>
            <hr />
            <p>{workout.description}</p>
          </div>
        </article>
      )}
    </div>
  );
};

export default WorkoutDetails;
