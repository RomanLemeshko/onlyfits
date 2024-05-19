import { PieChart } from '@mui/x-charts/PieChart';

const ChartsPieMacros = ({latestMacros}) => {

    // Проверяем, существует ли latestMacros и не является ли он пустым
    if (!latestMacros || Object.keys(latestMacros).length === 0) {
      return <div>You haven’t calculated your target yet</div>;
    }

  // Вычисляем общую сумму калорий
  const totalCalories =
    latestMacros.proteins + latestMacros.fats + latestMacros.carbohydrates;

  // Вычисляем процентное значение для каждого макронутриента
  const proteinsPercent = Math.round((latestMacros.proteins / totalCalories) * 100);
  const fatsPercent = Math.round((latestMacros.fats / totalCalories) * 100);
  const carbohydratesPercent = Math.round((latestMacros.carbohydrates / totalCalories) * 100);

  // Создаем массив объектов с процентными значениями и метками
  const data = [
    { id: 0, value: proteinsPercent, label: 'proteins' },
    { id: 1, value: fatsPercent, label: 'fats' },
    { id: 2, value: carbohydratesPercent, label: 'carbohydrates' },
  ];

  return (
    <PieChart
      series={[
        {
          data: data,
        },
      ]}
      width={400}
      height={200}
    />
  );
};

export default ChartsPieMacros;
