import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './dayPlanPage.css';
import { DayPlan } from '../calendarDayComponent/CalendarDayComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  Recipe,
  getAllRecipiesThunky,
} from '../../store/allRecipies/allRecipies';

const DayPlanPage = React.memo(({ data }: { data: DayPlan | null }) => {
  console.log('DATA SET', data);
  const mealArr: Recipe[] = useSelector(
    (state: RootState) => state.allRecipies.recipies
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllRecipiesThunky());
  }, []);

  function getRundomRecipies(arr: Recipe[]): Recipe[] {
    const recepiesForToday: Recipe[] = [];
    const randomTrack: number[] = [];
    for (let i = 0; i < 2; i++) {
      const random = Math.floor(Math.random() * 30);
      if (randomTrack.includes(random)) {
        i--;
      } else {
        randomTrack.push(random);
      }
    }
    for (let i = 0; i < 2; i++) {
      recepiesForToday.push(arr[randomTrack[i]]);
    }
    return recepiesForToday;
  }
  const dayMeal: Recipe[] = getRundomRecipies(mealArr);
  console.log('ALLMEAL: ', dayMeal);

  return (
    <div>
      <div
        id="day-plan-container"
        className="container-excersice-modal modal-excersices"
      >
        <h3>Your plan for the day</h3>
        <div>MORNING WORKOUT</div>
        <button className="start-btn">
          <Link to="/view-profile/day-plan/morning-routine">START</Link>
        </button>
        <div>EVENING WORKOUT</div>
        <button className="start-btn">
          <Link to="/view-profile/day-plan/workout">START</Link>
        </button>
        <div id="day-recipes">
          {!!dayMeal &&
            dayMeal.map((eachMeal: Recipe) => (
              <div key={eachMeal.id} className="meal-container">
                <Link to={`/view-profile/day-plan/eat/${eachMeal.id}` }>
                  <div className="day-meal-container">
                    <div className='meal-description'>
                    <h6 className='meal-complexity meal-title-consistensy'>easy to cook</h6>

                      <h6 className='meal-title-consistensy'>{eachMeal.title}</h6>
                      <h6 className='meal-title-consistensy'>
                        {eachMeal.time} : {eachMeal.kcal}
                      </h6>
                    </div>
                    <img className="meal-pic" src={eachMeal.url} alt="meal-picture" />
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
});

export default DayPlanPage;
