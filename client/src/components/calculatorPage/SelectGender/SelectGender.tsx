import { useContext } from 'react';
import { Select, Space } from 'antd';
import { CalculatorContext } from '../../context/CalculatorContext';
import './SelectGender.css'

const SelectGender = () => {
  
  const { setGender } = useContext(CalculatorContext);
  
  const handleChange = (value: string) => {
    // console.log(`selected gender ${value}`);
    setGender(value);
  };

  return (
    <Space wrap>
      <Select
        defaultValue="Select gender"
        style={{ width: 475, marginBottom: '10px' }}
        onChange={handleChange}
        options={[
          { value: 'Male', label: 'Male' },
          { value: 'Female', label: 'Female' },
        ]}
      />
    </Space>
  )

};

export default SelectGender;