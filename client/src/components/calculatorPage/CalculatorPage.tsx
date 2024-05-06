import { useContext, useState } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import LabeledInput from './LabeledInput/LabeledInput';
import SelectGender from './SelectGender/SelectGender';
import SelectPurpose from './SelectPurpose/SelectPurpose';
import SliderNumber from './SliderNumber/SliderNumber';
import './calculatorPage.css';

const CalculatorPage = () => {
  const { gender, purpose } = useContext(CalculatorContext);
  console.log('GENDER: ', gender);
  console.log('PURPOSE: ', purpose);

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
  
  console.log('WEIGHT:', weight);
  console.log('HEIGHT:', height);
  console.log('AGE:', age);
  console.log('STEP:', step);

  let kilocalories = 0;
  let proteins = 0;
  let carbohydrates = 0;
  let fats = 0;

  return (
    <>
      <h3 className="calculatorPage__header">Калькулятор калорий</h3>
      <SelectGender />
      <p></p>
      <SelectPurpose />
      <div className="inputValueCalculator">
        <LabeledInput
          label="Вес, кг"
          type="number"
          value={weight}
          onChange={inputWeightHandler}
        />
        <LabeledInput
          label="Рост, см"
          type="number"
          value={height}
          onChange={inputHeightHandler}
        />
        <LabeledInput
          label="Возраст"
          type="number"
          value={age}
          onChange={inputAgeHandler}
        />
      </div>
      <LabeledInput
        label="Шагов в среднем в день"
        type="number"
        value={step}
        onChange={inputStepHandler}
      />
      <SliderNumber />
      <div className="calculatorPage__result">
        <div>
          <h3>{`${kilocalories} ккал`}</h3>
        </div>
        <div className="calculatorPage__macros">
          <div>
            <p>Белки</p>
            <p>{`${proteins} гр.`}</p>
          </div>
          <div>
            <p>Жиры</p>
            <p>{`${fats} гр.`}</p>
          </div>
          <div>
            <p>Углеводы</p>
            <p>{`${carbohydrates} гр.`}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorPage;
