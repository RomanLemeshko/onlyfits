import { Select, Space } from 'antd';
import { useContext } from 'react';
import { CalculatorContext } from '../../context/CalculatorContext';

const SelectPurpose = () => {

  const { setPurpose } = useContext(CalculatorContext);

  const handleChange = (value: string) => {
    // console.log(`selected purpose ${value}`);
    setPurpose(value);
  };

  return (
  <Space wrap>
    <Select
      defaultValue="Select a goal"
      style={{ width: 475 }}
      onChange={handleChange}
      options={[
        { value: 'Lose weight', label: 'Lose weight' },
        { value: 'Keeping fit', label: 'Keeping fit' },
        { value: 'Gain muscle', label: 'Gain muscle' },
      ]}
    />
  </Space>
  )
};

export default SelectPurpose;