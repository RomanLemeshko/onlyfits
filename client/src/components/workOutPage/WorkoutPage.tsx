import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const startExercises = () => {
    // Создаем строку с названиями упражнений, разделенными запятыми
    const titles = arrWorkoutExcer.map(ex => encodeURIComponent(ex.title)).join(',');
    // Перенаправляем пользователя, включая в URL список упражнений
    navigate(`/view-profile/day-plan/workout/start/?exercises=${titles}`);
  };

  return (
    <div>
      <div id="day-workout-container">
        <h2>WORKOUT EXERCISES</h2>
        {arrWorkoutExcer.map((eachExercise) => (
          <div key={eachExercise.id} className="each-workout-exercise">
            <div>Exercise: {eachExercise.title}</div>
            <div>Duration: {eachExercise.duration}</div>
          </div>
        ))}
        <button onClick={startExercises}>
          Начать упражнения
        </button>
      </div>
    </div>
  );
};

export default WorkoutPage;
