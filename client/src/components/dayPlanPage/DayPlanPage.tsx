import { Link } from 'react-router-dom';
import './dayPlanPage.css';
import Header from '../header/Header';

const mealArr = [
  {
    id: 1,
    time: 'breakfast',
    cooktime: '5 min',
    complexity: 'easy',
    calories: 500,
  },
  {
    id: 1,
    time: 'lunch',
    cooktime: '15 min',
    complexity: 'intermediat',
    calories: 800,
  },
  {
    id: 1,
    time: 'dinner',
    cooktime: '25 min',
    complexity: 'intermediat',
    calories: 1000,
  },
];

const DayPlanPage = () => {
  return (
    <div>
      <Header />

      <div id="day-plan-container">
        <h3>Твой план на день</h3>
        <div>УТРЕННЯЯ ЗАРЯДКА</div>
        <button className="start-btn">
          <Link to="/view-profile/day-plan/morning-routine">НАЧАТЬ</Link>
        </button>
        <div>ОСНОВНОЕ ЗАНЯТИЕ</div>
        <button className="start-btn">
          <Link to="/view-profile/day-plan/workout">НАЧАТЬ</Link>
        </button>
        <div id="day-recipes">
          {mealArr.map((eachMeal) => (
            <div key={eachMeal.id} className='meal-container'>
              <Link to={`/view-profile/day-plan/${eachMeal.time}`}>
                <h2>{eachMeal.time}</h2>
                <h3>{eachMeal.cooktime}</h3>
                <h3>{eachMeal.complexity}</h3>
                <h3>{eachMeal.calories}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayPlanPage;
