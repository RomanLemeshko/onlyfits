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
      defaultValue="Выберите цель"
      style={{ width: 475 }}
      onChange={handleChange}
      options={[
        { value: 'Похудение', label: 'Похудение' },
        { value: 'Поддержание', label: 'Поддержание' },
        { value: 'Набор массы', label: 'Набор массы' },
      ]}
    />
  </Space>
  )
};

export default SelectPurpose;