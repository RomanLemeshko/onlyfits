import { Link } from 'react-router-dom';
import './dayPlanPage.css';
import Header from '../header/Header';

export type RecipeType = {
  id: number;
  time: string;
  cooktime: string;
  complexity: string;
  calories: number;
  ingridients: string;
  description: string;
};
export const mealArr = [
  {
    id: 1,
    time: 'breakfast',
    cooktime: '5 min',
    complexity: 'easy',
    calories: 500,
    ingridients: 'carb protein bread, peanut butter, coconut oil, mozzurella',
    description: 'keto peanut and mozzarella toast',
  },
  {
    id: 2,
    time: 'lunch',
    cooktime: '15 min',
    complexity: 'intermediat',
    calories: 800,
    ingridients: 'chicken breast, bulgar, cherry tomato, olive oil',
    description: 'Seasoned chicken breast with salt',
  },
  {
    id: 3,
    time: 'dinner',
    cooktime: '25 min',
    complexity: 'intermediat',
    calories: 1000,
    ingridients: 'ground beef, mushrooms, cream cheese, olive oil, salt',
    description: 'creamy beef abd mushroom bowl',
  },
];

const DayPlanPage = ({ data, isModalOpen, setIsModalOpen, close }) => {

    console.log('DATA SET', data);

  return (
    <div>
      {/* <Header /> */}

      <div id="day-plan-container" className='container-excersice-modal modal-excersices'>
        <h3>Твой план на день</h3>
        <div>УТРЕННЯЯ ЗАРЯДКА</div>
        <button className="start-btn">
          <Link to="/view-profile/day-plan/morning-routine">
            НАЧАТЬ ЗАНЯТИЕ
          </Link>
        </button>
        <div>ОСНОВНОЕ ЗАНЯТИЕ</div>
        <button className="start-btn">
          <Link to="/view-profile/day-plan/workout">НАЧАТЬ ЗАНЯТИЕ</Link>
        </button>
        <div id="day-recipes">
          {mealArr.map((eachMeal) => (
            <div key={eachMeal.id} className="meal-container">
              <Link to={`/view-profile/day-plan/eat/${eachMeal.id}`}>
                <h2>{eachMeal.time}</h2>
                <h3>Calories: {eachMeal.calories}</h3>
              </Link>
            </div>
          ))}
        </div>
        <button onClick={close}> CLOSE </button>
      </div>
      
    </div>
  );
};

export default DayPlanPage;
