import React, { useContext } from 'react';
import { Select, Space } from 'antd';
import { CalculatorContext } from '../../context/CalculatorContext';


const SelectGender = () => {
  
  const { setGender } = useContext(CalculatorContext);
  
  const handleChange = (value: string) => {
    // console.log(`selected gender ${value}`);
    setGender(value);
  };

  return (
    <Space wrap>
      <Select
        defaultValue="Выберите пол"
        style={{ width: 475 }}
        onChange={handleChange}
        options={[
          { value: 'Мужчина', label: 'Мужчина' },
          { value: 'Женщина', label: 'Женщина' },
        ]}
      />
    </Space>
  )

};

export default SelectGender;