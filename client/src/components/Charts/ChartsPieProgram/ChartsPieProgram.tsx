import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import './ChartsPieProgram.css'

const ChartsPieProgram = () => {
  const progs = useSelector((state: RootState) => state.userPrograms.programs);

  if (!progs || progs.length === 0) {
    return <div>No selected programs</div>;
  }

  // Вычисление общего количества программ
  const totalPrograms = progs.length;

  // Группировка программ по типу и вычисление процентов с округлением
  const chartData = progs.reduce((acc: Record<string, number>, program) => {
    const percent = Math.round(
      (acc[program.program_type] || 0) + (1 / totalPrograms) * 100
    );
    acc[program.program_type] = percent;
    return acc;
  }, {} as Record<string, number>);

  // Преобразование данных в массив для PieChart
  const chartDataArray = Object.keys(chartData).map((programType) => ({
    id: programType,
    value: chartData[programType],
    label: programType,
  }));

  return (
    <PieChart
      colors={['#ffa500', '#ff6f00', '#ff4500']}
      series={[{ data: chartDataArray, arcLabel: (item) => `${item.value} %`, }]} // Передача преобразованных данных в PieChart
      width={400}
      height={200}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
    />
  );
};

export default ChartsPieProgram;