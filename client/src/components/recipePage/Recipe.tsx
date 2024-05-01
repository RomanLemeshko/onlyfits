import {RecipeType, mealArr} from '../dayPlanPage/DayPlanPage'
import { useParams } from 'react-router-dom';
import './recipes.css'




const Recipe = () => {
  const {id} = useParams()
  const certainRecipe:RecipeType =mealArr[Number(id)-1]

  return (
    <div id="recipe-container">
      <h2>Your {certainRecipe.time}</h2>
      <h2>{certainRecipe.description}</h2>
      <h3>Complexity: {certainRecipe.complexity}</h3>
      <h3>Cooking time: {certainRecipe.cooktime}</h3>
      <h3>Ingridients: {certainRecipe.ingridients}</h3>
      <h3>Calories: {certainRecipe.calories}</h3>
      
    </div>
  );
};

export default Recipe;