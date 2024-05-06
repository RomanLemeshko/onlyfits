import React, { useState } from 'react';
import type { InputNumberProps } from 'antd';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import './SliderNumber.css'

const IntegerStep: React.FC = () => {
  const [inputValue, setInputValue] = useState(1);

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    setInputValue(newValue as number);
  };

  return (
    <>
    <Row>
      <Col span={18}>
        <Slider
          min={0}
          max={7}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
          step={1}
        />
      </Col>
      <Col span={1}>
        <InputNumber
          min={0}
          max={7}
          style={{ margin: '0 16px' }}
          value={inputValue}
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
      <p className='textSliderCalculator'>Функциональных тренировок в неделю</p>
      <IntegerStep />
      <p className='textSliderCalculator'>Силовых тренировок в неделю</p>
      <IntegerStep />
      <p className='textSliderCalculator'>Активных хобби в неделю</p>
      <IntegerStep />
    </Space>
  )
};

export default SliderNumber;