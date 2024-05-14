import React, { useContext } from 'react';
import type { InputNumberProps } from 'antd';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import './SliderNumber.css'
import { CalculatorContext } from '../../context/CalculatorContext';

const IntegerStepFunctionalTraining: React.FC = () => {

  const { functionalTraining, setFunctionalTraining } = useContext(CalculatorContext);

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    setFunctionalTraining(newValue as number);
  };

  return (
    <>
    <Row>
      <Col span={18}>
        <Slider
          min={0}
          max={7}
          onChange={onChange}
          value={typeof functionalTraining === 'number' ? functionalTraining : 0}
          step={1}
        />
      </Col>
      <Col span={1}>
        <InputNumber
          min={0}
          max={7}
          style={{ margin: '0 16px' }}
          value={functionalTraining}
          onChange={onChange}
          />
      </Col>
    </Row>
          </>
  );
};


const IntegerStepStrengthTraining: React.FC = () => {

  const { strengthTraining, setStrengthTraining } = useContext(CalculatorContext);

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    setStrengthTraining(newValue as number);
  };

  return (
    <>
    <Row>
      <Col span={18}>
        <Slider
          min={0}
          max={7}
          onChange={onChange}
          value={typeof strengthTraining === 'number' ? strengthTraining : 0}
          step={1}
        />
      </Col>
      <Col span={1}>
        <InputNumber
          min={0}
          max={7}
          style={{ margin: '0 16px' }}
          value={strengthTraining}
          onChange={onChange}
          />
      </Col>
    </Row>
          </>
  );
};



const IntegerStepActiveHobbies: React.FC = () => {

  const { activeHobbies, setActiveHobbies } = useContext(CalculatorContext);

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    setActiveHobbies(newValue as number);
  };

  return (
    <>
    <Row>
      <Col span={18}>
        <Slider
          min={0}
          max={7}
          onChange={onChange}
          value={typeof activeHobbies === 'number' ? activeHobbies : 0}
          step={1}
        />
      </Col>
      <Col span={1}>
        <InputNumber
          min={0}
          max={7}
          style={{ margin: '0 16px' }}
          value={activeHobbies}
          onChange={onChange}
          />
      </Col>
    </Row>
          </>
  );
};



const SliderNumber: React.FC = () => {

  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <p className='textSliderCalculator'>Functional training per week</p>
      <IntegerStepFunctionalTraining />
      <p className='textSliderCalculator'>Strength training per week</p>
      <IntegerStepStrengthTraining />
      <p className='textSliderCalculator'>Active hobbies per week</p>
      <IntegerStepActiveHobbies />
    </Space>
  )
};

export default SliderNumber;