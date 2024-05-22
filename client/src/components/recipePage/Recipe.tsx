import { useParams } from 'react-router-dom';
import './recipes.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  Recipe,
  getAllRecipiesThunky,
} from '../../store/allRecipies/allRecipies';
import Header from '../header/Header';
import { useEffect, useState } from 'react';

const RecipePage = () => {
  const { id } = useParams();
  const [certainMeal, setCertainMeal] = useState<Recipe>({
    id: 0,
    title: '',
    ingredients: '',
    kcal: '',
    protein: '',
    carbs: '',
    fat: '',
    url: '',
    type: '',
    time: '',
    instructions: '',
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllRecipiesThunky())
      .unwrap()
      .then((data) => {
        const foundMeal = data.find(
          (eachMeal: Recipe) => eachMeal.id === Number(id)
        );
        setCertainMeal(foundMeal);
      });
  }, [dispatch, id]);

  console.log('RECEAP PAGE: ', certainMeal);

  const ingredients = () => {
    const rawArr = certainMeal.ingredients.split(',');
    const ingredientsArr = [];
    for (const each of rawArr) {
      ingredientsArr.push(each.split('-'));
    }
    console.log(ingredientsArr);
    return ingredientsArr;
  };

  const cookingProcess = () => {
    const cookingSteps = certainMeal.instructions.split('.');

    console.log(cookingSteps);
    return cookingSteps.slice(0, cookingSteps.length - 1);
  };

  cookingProcess();

  return (
    <>
      <Header />

      {/* style={{backgroundImage:`url(${certainMeal?.url})`, backgroundSize: 'cover'}} */}
      <div className="main-container-recipe">
        <div className='meal-head'>
          <h3> {certainMeal.title}</h3>
          <div> {certainMeal.time} * Easy </div>
        </div>
        <div className='container-meal-capacity'>
          <div className="meal-capacity">
          <div className="kcal">
            <div>{certainMeal.kcal}</div>
            <div>kcal</div>
          </div>
          <div className="kcal">
            <div>{certainMeal.protein}</div>
            <div>protein</div>
          </div>
          <div className="kcal">
            <div>{certainMeal.carbs}</div>
            <div>carbs</div>
          </div>
          <div className="kcal">
            <div>{certainMeal.fat}</div>
            <div>fat</div>
          </div>
        </div>
        </div>
        <h4 className='ing-header'>INGRIDIENTS</h4>
        <div className="ingridients">
          <ul>
            {ingredients().map((each) => (
              <li key={Math.floor(Math.random() * 1000)}>
                <div className="eachIng">
                  <div>{each[1]} </div>
                  <div>{each[0]}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <h4>HOW TO COOK</h4>
        <ol className="cooking-process">
          {cookingProcess().map((eachStep) => (
            <li key={Math.floor(Math.random() * 1000)}>{eachStep}</li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default RecipePage;
