import { RecipeType, mealArr } from '../dayPlanPage/DayPlanPage';
import { useParams } from 'react-router-dom';
import './recipes.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  Recipe,
  getAllRecipiesThunky,
} from '../../store/allRecipies/allRecipies';
import Header from '../header/Header';
import { useEffect, useState } from 'react';

const RecipePage = () => {
  const { id } = useParams();
  const [certainMeal, setCrtainMeal] = useState<Recipe>({
    id: 0,
    title: "",
    ingredients: "",
    kcal: "",
    protein: "",
    carbs: "",
    fat: "",
    url: "",
    type: "",
    time: "",
    instructions: ""
  })

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllRecipiesThunky())
      .unwrap()
      .then((data) => {
        const foundMeal = data.find((eachMeal: Recipe) => eachMeal.id === Number(id));
        setCrtainMeal(foundMeal);
      });
  }, [dispatch, id]);

  // console.log('RECEAP PAGE: ', certainMeal);
  return (
    <>
      <Header />
      <div id="recipe-container">{certainMeal && certainMeal.title}</div>
    </>
  );
};

export default RecipePage;
