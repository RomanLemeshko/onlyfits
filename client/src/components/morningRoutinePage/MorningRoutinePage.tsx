import { Link } from 'react-router-dom';

const arrMorningRoutine = [
  {
    id: 1,
    title: 'rear decline bridge',
    duration: '30 sec',
  },
  { id: 2, title: 'leg front lift jack', duration: '30 sec' },

  { id: 3, title: 'wide stance jump', duration: '30 sec' },

  { id: 4, title: 'push-up on forearms', duration: '30 sec' },
  { id: 5, title: 'decline kneels push-up', duration: '30 sec' },

  { id: 6, title: 'crab pose', duration: '30 sec' },
];

const MorningRoutinePage = () => {
  return (
    <div>
      <h2>УТРЕННЯЯ ЗАРЯДКА</h2>

      <div>
        <div id="day-workout-container">
          <h2>WORKOUT EXCERCISES</h2>
          {arrMorningRoutine.map((eachExcersice) => (
            <div key={eachExcersice.id} className="each-workout-excercise">
              <div>Excersice: {eachExcersice.title}</div>
              <div>Duration: {eachExcersice.duration}</div>
            </div>
          ))}
          <button>
            <Link to="/view-profile/day-plan/morning-routine/start/">Начать упражнения</Link>
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default MorningRoutinePage;
