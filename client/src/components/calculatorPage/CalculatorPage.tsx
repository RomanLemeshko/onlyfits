import { useContext, useEffect, useState } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import LabeledInput from './LabeledInput/LabeledInput';
import SelectGender from './SelectGender/SelectGender';
import SelectPurpose from './SelectPurpose/SelectPurpose';
import SliderNumber from './SliderNumber/SliderNumber';
import './calculatorPage.css';

const CalculatorPage = ({ updateCaloriesData }:any ) => {
  const { gender, purpose, functionalTraining, strengthTraining, activeHobbies } = useContext(CalculatorContext);

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [step, setStep] = useState('');

  function inputWeightHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setWeight(event.target.value);
  }
  
  function inputHeightHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setHeight(event.target.value);
  }
  
  function inputAgeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setAge(event.target.value);
  }
  
  function inputStepHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setStep(event.target.value);
  }

  const [kilocalories, setKilocalories] = useState<number>(0);
  const [proteins, setProteins] = useState<number>(0);
  const [carbohydrates, setCarbohydrates] = useState<number>(0);
  const [fats, setFats] = useState<number>(0);

  useEffect(() => {
    const result = calculateCalories(gender, purpose, weight, height, age, step, functionalTraining, strengthTraining, activeHobbies);

    updateCaloriesData({
      kilocalories: Math.round(result),
      proteins: Math.round(result * 0.25 / 4),
      fats: Math.round(result * 0.3 / 9),
      carbohydrates: Math.round(result * 0.45 / 4),
      purpose
    });

    setKilocalories(Math.round(result));
    setProteins(Math.round(result*0.25/4));
    setCarbohydrates(Math.round(result*0.45/4));
    setFats(Math.round(result*0.3/9));
  }, [gender, purpose, weight, height, age, step, functionalTraining, strengthTraining, activeHobbies]);

  function calculateCalories (gender: string, purpose: string, weight: string, height: string, age: string, step: string, functionalTraining: number, strengthTraining: number, activeHobbies: number) {
    
    // Константы для расчета калорий
    const menCoefficient = 5;
    const womenCoefficient = 4;
    const activityFactor = 1.4; // Средний коэффициент активности для повседневной деятельности

    // Рассчитываем базовый метаболизм в зависимости от пола
    let bmr;
    if (gender === "Male") {
        bmr = (menCoefficient * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age)) + 5;
    } else if (gender === "Female") {
        bmr = (womenCoefficient * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age)) - 161;
    } else {
        return 0;
    }

    // Рассчитываем общий калорийный расход с учетом активности
    let totalCalories;
    switch (purpose) {
        case "Lose weight":
            totalCalories = bmr * activityFactor - 500; // Для похудения вычитаем 500 ккал
            break;
        case "Keeping fit":
            totalCalories = bmr * activityFactor;
            break;
        case "Gain muscle":
            totalCalories = bmr * activityFactor + 200; // Для набора массы добавляем 300 ккал
            break;
        default:
            return 0;
    }

    // Дополнительные калории на основе количества шагов и тренировок
    totalCalories += (Number(step) * 0.05); // Прибавляем 0.05 калорий за каждый шаг
    totalCalories += (functionalTraining * 80); // Прибавляем 80 калорий за каждую функциональную тренировку
    totalCalories += (strengthTraining * 80); // Прибавляем 80 калорий за каждую силовую тренировку
    totalCalories += (activeHobbies * 50); // Прибавляем 50 калорий за каждое активное хобби

    return totalCalories;

  }

  return (
    <>
      <h3 className="calculatorPage__header">Calorie calculator</h3>
      <SelectGender />
      <p> </p>
      <SelectPurpose />
      <div className="inputValueCalculator">
        <LabeledInput
          label="Weight, kg"
          type="number"
          value={weight}
          onChange={inputWeightHandler}
        />
        <LabeledInput
          label="Growth, cm"
          type="number"
          value={height}
          onChange={inputHeightHandler}
        />
        <LabeledInput
          label="Age"
          type="number"
          value={age}
          onChange={inputAgeHandler}
        />
      </div>
      <LabeledInput
        label="Average steps per day"
        type="number"
        value={step}
        onChange={inputStepHandler}
      />
      <SliderNumber />
      <div className="calculatorPage__result">
        <div>
          <h3>{`${kilocalories} kcal`}</h3>
        </div>
        <div className="calculatorPage__macros">
          <div>
            <p>Proteins</p>
            <p>{`${proteins} gr.`}</p>
          </div>
          <div>
            <p>Fats</p>
            <p>{`${fats} gr.`}</p>
          </div>
          <div>
            <p>Carbs</p>
            <p>{`${carbohydrates} gr.`}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorPage;
