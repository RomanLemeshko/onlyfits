import { Link } from 'react-router-dom';
import './workout.css';

const arrWorkoutExcer = [
  {
    id: 1,
    title: 'arm crossover crusty',
    duration: '30 sec',
  },
  { id: 2, title: 'dumbbell larsen press', duration: '30 sec' },

  { id: 3, title: 'band horizontal pallof press', duration: '30 sec' },

  { id: 4, title: 'floor dumbbell fly', duration: '15 rep' },
  { id: 5, title: 'tricep kickback', duration: '11 rep' },

  { id: 6, title: 'dumbell low windmil', duration: '30 sec' },
];

const WorkoutPage = () => {
  return (
    <div>
      <div id="day-workout-container">
        <h2>WORKOUT EXCERCISES</h2>
        {arrWorkoutExcer.map((eachExcersice) => (
          <div key={eachExcersice.id} className="each-workout-excercise">
            <div>Excersice: {eachExcersice.title}</div>
            <div>Duration: {eachExcersice.duration}</div>
          </div>
        ))}
        <button>
          <Link to="/view-profile/day-plan/workout/start/">
            Начать упражнения
          </Link>
        </button>
      </div>
    </div>
  );
};

export default WorkoutPage;