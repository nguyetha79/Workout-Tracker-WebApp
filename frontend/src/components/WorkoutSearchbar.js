import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutSearchbar = () => {
  const [search, setSearch] = useState("");
  const { user } = useAuthContext();
  const [setError] = useState(null);
  const { dispatch } = useWorkoutsContext();

  const handleSearch = async (value) => {
    value.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const response = await fetch("/api/workouts/search?title=" + search, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      dispatch({ type: "SEARCH_WORKOUT", payload: json });
      console.log(json)
    }
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <h3>Search your Workout</h3>

      <input
        type="search"
        aria-label="Workout Search Input"
        placeholder="Enter the workout title"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <button>Search</button>
    </form>
  );
};

export default WorkoutSearchbar;
