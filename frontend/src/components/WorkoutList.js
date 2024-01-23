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
