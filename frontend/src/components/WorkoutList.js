// Author: iamshaunjp
// Date: 13 Dec 2020
// Title of source code: Full React Tutorial - Programmatic Redirects
// Type: source code
// Web address: https://github.com/iamshaunjp/Complete-React-Tutorial/blob/lesson-30/dojo-blog/src/BlogList.js

import WorkoutCard from "../components/WorkoutCard";

const WorkoutList = ({ workouts}) => {
  return (
    <div className="workouts">
      {workouts.map((workout) => (
        <WorkoutCard workout={workout} key={workout._id} />
      ))}
    </div>
    
  );
};

export default WorkoutList;
